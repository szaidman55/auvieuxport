-- De kaart zoals ze op 22 september 2026 op restaurantauvieuxport.be stond,
-- met de prijzen die daar vermeld waren. Dit is een vertrekpunt: vanaf hier
-- beheert de zaal de kaart in /admin en raakt niemand dit bestand nog aan.
--
-- De wijnen hieronder zijn de champagnes van Perrier-Jouet, als werkend
-- voorbeeld van hoe een referentie eruitziet. De resterende ruim 520 flessen
-- worden geimporteerd uit de bestaande kaart.

-- === de gangen ===============================================================

insert into menu_sections (id, title_nl, title_en, title_fr, position) values
  ('voorgerechten',  'Voorgerechten',            'Starters',            'Entrees',            10),
  ('hoofdgerechten', 'Hoofdgerechten',           'Main courses',        'Plats',              20),
  ('specialiteiten', 'Specialiteiten',           'Specialities',        'Specialites',        30),
  ('bijgerechten',   'Garnituren en sauzen',     'Sides and sauces',    'Garnitures et sauces', 40),
  ('desserten',      'Desserten',                'Desserts',            'Desserts',           50)
on conflict (id) do update set
  title_nl = excluded.title_nl, title_en = excluded.title_en,
  title_fr = excluded.title_fr, position = excluded.position;

update menu_sections set
  note_nl = 'Canard a la Rouennaise is het hele jaar verkrijgbaar. Tijdens het wildseizoen enkel op bestelling.',
  note_en = 'Canard a la Rouennaise is available all year. During the game season by advance order only.',
  note_fr = 'Le Canard a la Rouennaise est disponible toute l''annee. Pendant la saison du gibier, sur commande uniquement.'
where id = 'specialiteiten';

-- === de gerechten ============================================================

insert into menu_items (section_id, name_nl, name_en, name_fr, price, per_person, requires_preorder, position) values
  ('voorgerechten',  'Kaaskroket',                  'Cheese croquette',        'Croquette au fromage',        26, false, false, 10),
  ('voorgerechten',  'Carpaccio van Rib-Eye',       'Rib-eye carpaccio',       'Carpaccio de rib-eye',        26, false, false, 20),
  ('voorgerechten',  'Tarte au Boudin Basque',      'Tarte au Boudin Basque',  'Tarte au Boudin Basque',      31, false, false, 30),
  ('voorgerechten',  'Een bereiding met ganzenlever','A preparation of foie gras','Une preparation de foie gras',37, false, false, 40),
  ('voorgerechten',  'Huisgerookte zalm',           'House-smoked salmon',     'Saumon fume maison',          28, false, false, 50),
  ('voorgerechten',  'Oesters',                     'Oysters',                 'Huitres',                     39, false, false, 60),

  ('hoofdgerechten', 'Steak tartare a la minute',   'Steak tartare a la minute','Steak tartare a la minute',   36, false, false, 10),
  ('hoofdgerechten', 'Filet Pur',                   'Beef fillet',             'Filet pur',                   53, false, false, 20),
  ('hoofdgerechten', 'Entrecote',                   'Entrecote',               'Entrecote',                   55, false, false, 30),

  ('bijgerechten',   'Peperroom, bearnaise of choron','Pepper cream, bearnaise or choron','Creme au poivre, bearnaise ou choron', 6, false, false, 10),
  ('bijgerechten',   'Groene salade',               'Green salad',             'Salade verte',                 6, false, false, 20),
  ('bijgerechten',   'Tomaat met witloofsalade',    'Tomato and chicory salad','Salade de tomates et endives',  7, false, false, 30),
  ('bijgerechten',   'Warme groenten',              'Warm vegetables',         'Legumes chauds',               12, false, false, 40),

  ('desserten',      'Kaas per stuk',               'Cheese, per piece',       'Fromage, a la piece',           5, false, false, 10),
  ('desserten',      'Cafe glace',                  'Cafe glace',              'Cafe glace',                   13, false, false, 20),
  ('desserten',      'Dame Blanche',                'Dame Blanche',            'Dame Blanche',                 15, false, false, 30),
  ('desserten',      'Sabayon',                     'Sabayon',                 'Sabayon',                      15, false, false, 40),
  ('desserten',      'Crepes Suzette met vanille-ijs','Crepes Suzette with vanilla ice cream','Crepes Suzette et glace vanille', 25, false, false, 50),
  ('desserten',      'Moelleux au Chocolat',        'Moelleux au chocolat',    'Moelleux au chocolat',         14, false, false, 60);

-- De specialiteiten. De canard rekent per persoon en moet vooraf besteld
-- worden: requires_preorder stuurt de vraag in de reserveerflow.
insert into menu_items
  (section_id, name_nl, name_en, name_fr, note_nl, note_en, note_fr,
   price, per_person, requires_preorder, position)
values
  ('specialiteiten', 'Canard a la Rouennaise', 'Canard a la Rouennaise', 'Canard a la Rouennaise',
   'Deels aan tafel bereid met een authentieke presse a canard. Vooraf te bestellen.',
   'Finished beside your table with a genuine presse a canard. To be ordered in advance.',
   'Termine devant vous a l''aide d''une authentique presse a canard. A commander a l''avance.',
   65, true, true, 10),
  ('specialiteiten', 'Zwartpootkip uit de Landes', 'Black-leg chicken from the Landes', 'Poulet pattes noires des Landes',
   null, null, null, 45, true, false, 20),
  ('specialiteiten', 'Paling in ''t groen', 'Eel in green herb sauce', 'Anguille au vert',
   null, null, null, 45, false, false, 30);

-- Zeetong loopt aan dagprijs: price blijft leeg en de site toont "dagprijs".
insert into menu_items (section_id, name_nl, name_en, name_fr, price, position)
values ('specialiteiten', 'Zeetong', 'Sole', 'Sole', null, 40);

-- === de kelder ===============================================================

insert into wine_sections (id, title_nl, title_en, title_fr, position) values
  ('sparkling', 'Mousserende wijnen', 'Sparkling wines', 'Vins effervescents', 10),
  ('white',     'Witte wijnen',       'White wines',     'Vins blancs',        20),
  ('red',       'Rode wijnen',        'Red wines',       'Vins rouges',        30),
  ('rose',      'Rosé wijnen',      'Rosé wines',  'Rosés',             40),
  ('sweet',     'Zoete wijnen',       'Sweet wines',     'Vins doux',          50)
on conflict (id) do update set
  title_nl = excluded.title_nl, title_en = excluded.title_en,
  title_fr = excluded.title_fr, position = excluded.position;

insert into wines
  (colour, producer, name, country, region, appellation, grapes, vintage,
   bottle_size, bottle, tasting_note, position)
values
  ('sparkling', 'Perrier-Jouet', 'Grand Brut', 'Frankrijk', 'Champagne', 'Champagne',
   array['Chardonnay', 'Pinot Noir', 'Pinot Meunier'], null, 0.750, 110,
   'Elegante stijl van champagne.', 10),
  ('sparkling', 'Perrier-Jouet', 'Grand Brut (Magnum)', 'Frankrijk', 'Champagne', 'Champagne',
   array['Chardonnay', 'Pinot Noir', 'Pinot Meunier'], null, 1.500, 220,
   'Elegante stijl van champagne.', 20),
  ('sparkling', 'Perrier-Jouet', 'Blason Rose Brut', 'Frankrijk', 'Champagne', 'Champagne',
   array['Chardonnay', 'Pinot Noir', 'Pinot Meunier'], null, 0.750, 130,
   'Levendig, gul en fris.', 30),
  ('sparkling', 'Perrier-Jouet', 'Blanc de Blancs', 'Frankrijk', 'Champagne', 'Champagne',
   array['Chardonnay'], null, 0.750, 160,
   'Helder, fris en dynamisch.', 40),
  ('sparkling', 'Perrier-Jouet', 'Belle Epoque Brut', 'Frankrijk', 'Champagne', 'Champagne',
   array['Chardonnay', 'Pinot Noir', 'Pinot Meunier'], 2014, 0.750, 350,
   'Zeldzaam, elegant en harmonieus.', 50),
  ('sparkling', 'Perrier-Jouet', 'Belle Epoque Rose', 'Frankrijk', 'Champagne', 'Champagne',
   array['Chardonnay', 'Pinot Noir', 'Pinot Meunier'], 2013, 0.750, 550,
   null, 60);

-- === de uren =================================================================
-- Maandag tot en met vrijdag. Zaterdag en zondag staan hier bewust niet:
-- de site leidt daaruit af dat het huis dan gesloten is, en zegt dat ook.

insert into opening_hours (weekday, service, opens, closes) values
  (1, 'lunch', '12:00', '14:00'), (1, 'dinner', '18:00', '21:30'),
  (2, 'lunch', '12:00', '14:00'), (2, 'dinner', '18:00', '21:30'),
  (3, 'lunch', '12:00', '14:00'), (3, 'dinner', '18:00', '21:30'),
  (4, 'lunch', '12:00', '14:00'), (4, 'dinner', '18:00', '21:30'),
  (5, 'lunch', '12:00', '14:00'), (5, 'dinner', '18:00', '21:30')
on conflict (weekday, service) do update set
  opens = excluded.opens, closes = excluded.closes;

insert into site_settings (id) values (true) on conflict (id) do nothing;
