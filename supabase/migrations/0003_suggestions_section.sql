-- De suggesties, en secties die het huis zelf kan bijmaken.
--
-- De suggesties zijn de seizoens- of weekkaart. Op de site heten ze
-- Suggesties in het Nederlands, Suggestions in het Frans en Specials in het
-- Engels: geen letterlijke vertaling, maar het woord dat een Engelstalige
-- gast op een kaart verwacht.
--
-- Geen aparte tabel: een suggestie is een gerecht met een kortere
-- houdbaarheid dan de rest. Als sectie in menu_sections erft ze alles wat de
-- kaart al heeft, van de drietalige velden en de dagprijs tot uitverkocht, de
-- vertaalterugval, row level security en de bestaande weergave op de site.
--
-- Het verschil met een gewone sectie is waar ze beheerd wordt, niet wat ze
-- is. Daarom een vlag en geen tweede tabel: het scherm Suggesties toont de
-- secties met de vlag, het scherm De kaart de rest, en de manager kan in
-- allebei secties bijmaken.

alter table menu_sections
  add column if not exists is_suggestion boolean not null default false;

comment on column menu_sections.is_suggestion is
  'Beheerd onder Suggesties in plaats van onder De kaart. Verandert niets aan de weergave op de site.';

-- Een sectie om mee te beginnen. Positie 5, dus voor de voorgerechten op 10:
-- het eerste wat een gast leest. Een lege sectie wordt op de site
-- overgeslagen, dus tot er iets in staat is er niets te zien.
--
-- Zonder ondertitel. Of het nu de week of het seizoen is, dat is aan het
-- huis om te schrijven, niet aan mij om te verzinnen.
insert into menu_sections
  (id, title_nl, title_en, title_fr, position, published, is_suggestion)
values ('suggesties', 'Suggesties', 'Specials', 'Suggestions', 5, true, true)
on conflict (id) do update set
  title_nl = excluded.title_nl,
  title_en = excluded.title_en,
  title_fr = excluded.title_fr,
  is_suggestion = true,
  position = excluded.position;
