-- Au Vieux Port - de kaart, de kelder en het huis.
--
-- De website van 2026 had de kaart als platte tekst in de pagina staan: elke
-- prijswijziging was een bouwer bellen, en de wijnkaart droeg een datum die
-- met de hand werd bijgewerkt. Alles hieronder bestaat zodat de zaal zelf de
-- kaart en de kelder beheert, en de site altijd toont wat er vandaag klopt.
--
-- De kaart is drietalig. Nederlands is verplicht; Engels en Frans vallen daar
-- op terug als ze leeg zijn, zodat een nieuw gerecht meteen op alle drie de
-- talen verschijnt en later vertaald kan worden.

create extension if not exists "pgcrypto";

-- === rollen ==================================================================
-- Twee rollen, en de splitsing volgt wat mensen werkelijk doen:
--   floor   - iets als uitverkocht markeren, en terugzetten. Meer niet.
--   manager - de kaart, de kelder, de uren en de berichten.

do $$ begin
  create type staff_role as enum ('floor', 'manager');
exception when duplicate_object then null; end $$;

create table if not exists staff (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  name       text not null,
  role       staff_role not null default 'floor',
  active     boolean not null default true,
  created_at timestamptz not null default now()
);

create or replace function is_staff()
returns boolean language sql security definer set search_path = public stable as $fn$
  select exists (select 1 from staff where user_id = auth.uid() and active);
$fn$;

create or replace function is_manager()
returns boolean language sql security definer set search_path = public stable as $fn$
  select exists (select 1 from staff where user_id = auth.uid() and active and role = 'manager');
$fn$;

-- Houdt updated_at eerlijk, zodat de kaart kan tonen wanneer ze laatst bewoog.
create or replace function touch_updated_at()
returns trigger language plpgsql as $fn$
begin new.updated_at = now(); return new; end;
$fn$;

-- === de kaart ================================================================

create table if not exists menu_sections (
  id        text primary key,
  title_nl  text not null,
  title_en  text,
  title_fr  text,
  note_nl   text,
  note_en   text,
  note_fr   text,
  position  int not null default 0,
  published boolean not null default true
);

create table if not exists menu_items (
  id         uuid primary key default gen_random_uuid(),
  section_id text not null references menu_sections (id) on delete cascade,
  name_nl    text not null,
  name_en    text,
  name_fr    text,
  note_nl    text,
  note_en    text,
  note_fr    text,
  -- Leeg laten bij dagprijs. De site toont dan "dagprijs" in de juiste taal.
  price      numeric(6,2) check (price >= 0),
  -- Canard a la Rouennaise en de zwartpootkip rekenen per persoon.
  per_person boolean not null default false,
  -- De canard wordt deels aan tafel bereid en moet vooraf besteld worden.
  -- De reserveerflow leest deze vlag om de vraag te stellen.
  requires_preorder boolean not null default false,
  -- Seizoensgerechten: fazant, hazenrug. Buiten het seizoen verborgen.
  seasonal   boolean not null default false,
  sold_out   boolean not null default false,
  allergens  text[] not null default '{}',
  position   int not null default 0,
  updated_at timestamptz not null default now()
);

create index if not exists menu_items_section_idx on menu_items (section_id, position);

drop trigger if exists menu_items_touch on menu_items;
create trigger menu_items_touch before update on menu_items
  for each row execute function touch_updated_at();

-- === de kelder ===============================================================
-- Ruim 520 referenties, met Bourgogne als zwaartepunt. De kaart wordt per
-- kleur gelezen en binnen een kleur per land en streek, dus zo is ze ook
-- opgeslagen.

do $$ begin
  create type wine_colour as enum ('sparkling', 'white', 'red', 'rose', 'sweet');
exception when duplicate_object then null; end $$;

create table if not exists wine_sections (
  id       wine_colour primary key,
  title_nl text not null,
  title_en text,
  title_fr text,
  position int not null default 0
);

create table if not exists wines (
  id          uuid primary key default gen_random_uuid(),
  colour      wine_colour not null references wine_sections (id),
  producer    text not null,
  -- Leeg voor een wijn die enkel onder de producentnaam loopt.
  name        text,
  country     text not null,
  region      text,
  appellation text,
  grapes      text[] not null default '{}',
  -- Leeg voor een niet-millesime, waar de kaart NV toont.
  vintage     int check (vintage between 1900 and 2100),
  -- In liter: 0.375 halve fles, 0.75 fles, 1.5 magnum, 3.0 jeroboam.
  bottle_size numeric(4,3) not null default 0.750,
  bottle      numeric(7,2) not null check (bottle >= 0),
  -- Gevuld voor de wijnen die per glas geschonken worden.
  glass       numeric(6,2) check (glass >= 0),
  tasting_note text,
  -- De sommelier licht er een paar uit.
  sommelier_pick boolean not null default false,
  available   boolean not null default true,
  position    int not null default 0,
  updated_at  timestamptz not null default now()
);

create index if not exists wines_colour_idx on wines (colour, country, region, position);
create index if not exists wines_available_idx on wines (available) where available;

drop trigger if exists wines_touch on wines;
create trigger wines_touch before update on wines
  for each row execute function touch_updated_at();

-- === het huis ================================================================
-- Openingsuren als gegevens, niet als tekst in een pagina. De site rendert ze
-- voor de bezoeker en voert ze tegelijk aan Google als openingHoursSpecification.

create table if not exists opening_hours (
  -- 1 = maandag ... 7 = zondag, zoals ISO.
  weekday int not null check (weekday between 1 and 7),
  service text not null check (service in ('lunch', 'dinner')),
  opens   time not null,
  closes  time not null,
  primary key (weekday, service),
  check (closes > opens)
);

-- Sluitingsdagen en afwijkingen: verlof, feestdagen, een gesloten dag.
create table if not exists hours_exceptions (
  day     date primary key,
  closed  boolean not null default true,
  note_nl text,
  note_en text,
  note_fr text
);

create table if not exists site_settings (
  id           boolean primary key default true check (id),
  -- Een mededeling bovenaan de site: verlof, een wijnavond, een feestdag.
  banner_nl    text,
  banner_en    text,
  banner_fr    text,
  banner_until date,
  updated_at   timestamptz not null default now()
);

drop trigger if exists site_settings_touch on site_settings;
create trigger site_settings_touch before update on site_settings
  for each row execute function touch_updated_at();

-- === wat gasten achterlaten ==================================================

create table if not exists newsletter_subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  locale     text not null default 'nl' check (locale in ('nl', 'en', 'fr')),
  confirmed  boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  message    text not null,
  locale     text not null default 'nl',
  handled    boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_open_idx
  on contact_messages (created_at desc) where not handled;

-- === row level security ======================================================
-- De gast leest de kaart. Alleen de zaal verandert ze. Wat gasten achterlaten
-- kan iedereen schrijven maar alleen de zaal lezen: een inschrijving mag geen
-- adressenlijst zijn die de hele wereld kan uitlezen.

alter table staff                  enable row level security;
alter table menu_sections          enable row level security;
alter table menu_items             enable row level security;
alter table wine_sections          enable row level security;
alter table wines                  enable row level security;
alter table opening_hours          enable row level security;
alter table hours_exceptions       enable row level security;
alter table site_settings          enable row level security;
alter table newsletter_subscribers enable row level security;
alter table contact_messages       enable row level security;

do $policies$
declare t text;
begin
  -- Publiek leesbaar: alles wat op de site hoort te staan.
  foreach t in array array['menu_sections', 'menu_items', 'wine_sections', 'wines',
                           'opening_hours', 'hours_exceptions', 'site_settings']
  loop
    execute format('drop policy if exists "public read" on %I', t);
    execute format('create policy "public read" on %I for select using (true)', t);

    execute format('drop policy if exists "manager writes" on %I', t);
    execute format('create policy "manager writes" on %I for all using (is_manager()) with check (is_manager())', t);
  end loop;
end $policies$;

-- De vloer mag uitverkocht zetten, en niets anders. Een verborgen knop is geen
-- rechtenmodel; dit wel.
drop policy if exists "floor marks menu sold out" on menu_items;
create policy "floor marks menu sold out" on menu_items for update
  using (is_staff()) with check (is_staff());

drop policy if exists "floor marks wine unavailable" on wines;
create policy "floor marks wine unavailable" on wines for update
  using (is_staff()) with check (is_staff());

drop policy if exists "staff read themselves" on staff;
create policy "staff read themselves" on staff for select
  using (user_id = auth.uid() or is_manager());
drop policy if exists "manager writes staff" on staff;
create policy "manager writes staff" on staff for all
  using (is_manager()) with check (is_manager());

-- Inschrijven en schrijven mag iedereen; terugzien alleen de zaal.
drop policy if exists "anyone subscribes" on newsletter_subscribers;
create policy "anyone subscribes" on newsletter_subscribers for insert with check (true);
drop policy if exists "staff read subscribers" on newsletter_subscribers;
create policy "staff read subscribers" on newsletter_subscribers for select using (is_staff());
drop policy if exists "manager writes subscribers" on newsletter_subscribers;
create policy "manager writes subscribers" on newsletter_subscribers for all
  using (is_manager()) with check (is_manager());

drop policy if exists "anyone writes" on contact_messages;
create policy "anyone writes" on contact_messages for insert with check (true);
drop policy if exists "staff read messages" on contact_messages;
create policy "staff read messages" on contact_messages for select using (is_staff());
drop policy if exists "staff handles messages" on contact_messages;
create policy "staff handles messages" on contact_messages for update
  using (is_staff()) with check (is_staff());
