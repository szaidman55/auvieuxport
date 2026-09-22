-- Two gaps the first version left open.
--
-- 1. A price is not always a number. "Kaas per stuk" is charged per piece, and
--    the old site simply printed no price next to it. Until now an empty price
--    meant "dagprijs", which would have been a lie for the cheese. A dish can
--    now carry its own short price label instead.
--
-- 2. The team was three names hard-coded in a page. They are the people the
--    guest meets, their roles change, and the house should be able to edit
--    them like everything else.

alter table menu_items
  add column if not exists price_note_nl text,
  add column if not exists price_note_en text,
  add column if not exists price_note_fr text;

comment on column menu_items.price_note_nl is
  'Getoond in plaats van een prijs. Leeg + prijs leeg betekent dagprijs.';

create table if not exists team_members (
  id         uuid primary key default gen_random_uuid(),
  slug       text not null unique,
  name       text not null,
  role_nl    text not null,
  role_en    text,
  role_fr    text,
  -- Alinea's gescheiden door een lege regel.
  bio_nl     text not null,
  bio_en     text,
  bio_fr     text,
  photo      text,
  -- Een enkele link onder het portret, bijvoorbeeld naar The Mastercooks.
  link_url   text,
  link_nl    text,
  link_en    text,
  link_fr    text,
  position   int not null default 0,
  published  boolean not null default true,
  updated_at timestamptz not null default now()
);

drop trigger if exists team_members_touch on team_members;
create trigger team_members_touch before update on team_members
  for each row execute function touch_updated_at();

alter table team_members enable row level security;

drop policy if exists "public read" on team_members;
create policy "public read" on team_members for select using (true);

drop policy if exists "manager writes" on team_members;
create policy "manager writes" on team_members for all
  using (is_manager()) with check (is_manager());
