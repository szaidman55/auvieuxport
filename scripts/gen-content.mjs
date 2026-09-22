// Generates the menu and team seed from what the old site actually published.
import fs from 'fs';

const team = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const q = (v) => (v === null || v === undefined || v === '' ? 'null' : "'" + String(v).replace(/'/g, "''") + "'");

const SECTIONS = [
  { id: 'voorgerechten', nl: 'Voorgerechten', en: 'Starters', fr: 'Entrées', pos: 10 },
  {
    id: 'hoofdgerechten', nl: 'Hoofdgerechten', en: 'Main courses', fr: 'Plats', pos: 20,
    note_nl: 'Peperroom · Béarnaise · Choron',
    note_en: 'Pepper cream · Béarnaise · Choron',
    note_fr: 'Sauce poivre · Béarnaise · Choron',
  },
  { id: 'garnituren', nl: 'Garnituren', en: 'Sides', fr: 'Garnitures', pos: 30 },
  {
    id: 'specialiteiten', nl: 'Specialiteiten "Au Vieux Port"', en: '"Au Vieux Port" specialities', fr: 'Spécialités « Au Vieux Port »', pos: 40,
    note_nl: 'Canard à la Rouennaise is het hele jaar verkrijgbaar. Tijdens het wildseizoen enkel op bestelling.',
    note_en: 'Canard à la Rouennaise is available all year round. During the game season by advance order only.',
    note_fr: "Le Canard à la Rouennaise est disponible toute l'année, et uniquement sur commande pendant la saison du gibier.",
  },
  { id: 'desserten', nl: 'Desserten', en: 'Desserts', fr: 'Desserts', pos: 50 },
];

const ITEMS = [
  ['voorgerechten', 'Kaaskroket', 'Cheese croquette', 'Croquette au fromage', 26, {}],
  ['voorgerechten', 'Carpaccio van Rib-Eye', 'Rib-eye carpaccio', 'Carpaccio de rib-eye', 26, {}],
  ['voorgerechten', 'Tarte au Boudin Basque', 'Tarte au Boudin Basque', 'Tarte au Boudin Basque', 31, {}],
  ['voorgerechten', 'Een bereiding met ganzenlever', 'A preparation of foie gras', 'Une préparation de foie gras', 37, {}],
  ['voorgerechten', 'Huisgerookte zalm', 'House-smoked salmon', 'Saumon fumé maison', 28, {}],
  ['voorgerechten', 'Oesters', 'Oysters', 'Huîtres', 39, {}],

  ['hoofdgerechten', 'Steak tartare à la minute', 'Steak tartare à la minute', 'Steak tartare à la minute', 36, {}],
  ['hoofdgerechten', 'Filet Pur', 'Beef fillet', 'Filet pur', 53, {}],
  ['hoofdgerechten', 'Entrecôte', 'Entrecôte', 'Entrecôte', 55, {}],

  ['garnituren', 'Groene salade', 'Green salad', 'Salade verte', 12, {}],
  ['garnituren', 'Tomaat- en witloofsalade', 'Tomato and chicory salad', 'Salade tomates - chicons', 12, {}],
  ['garnituren', 'Warme groenten', 'Warm vegetables', 'Légumes chauds', 12, {}],

  ['specialiteiten', 'Canard à la Rouennaise', 'Canard à la Rouennaise', 'Canard à la Rouennaise', 65, { pp: true, pre: true }],
  ['specialiteiten', 'Zwartpootkip uit de Landes', 'Black-leg chicken from the Landes', 'Poulet pattes noires des Landes', 45, { pp: true }],
  ["specialiteiten", "Paling in 't groen", 'Eel in green herb sauce', 'Anguille au vert', 45, {}],
  ['specialiteiten', 'Zeetong', 'Dover sole', 'Sole', null, {}],

  // The cheese is charged per piece; the house prints no amount next to it.
  ['desserten', 'Kaas per stuk', 'Cheese, per piece', 'Fromage à la pièce', null, { pn: ['per stuk', 'per piece', 'à la pièce'] }],
  ['desserten', 'Café Glacé', 'Café glacé', 'Café glacé', 13, {}],
  ['desserten', 'Dame Blanche', 'Dame Blanche', 'Dame blanche', 15, {}],
  ['desserten', 'Sabayon', 'Sabayon', 'Sabayon', 15, {}],
  ['desserten', 'Crêpes Suzette met vanille-ijs', 'Crêpes Suzette, vanilla ice cream', 'Crêpes Suzette, glace vanille', 25, {}],
  ['desserten', 'Moelleux au Chocolat', 'Moelleux au chocolat', 'Moelleux au chocolat', 14, {}],
];

const PHOTO = {
  'Stijn Havermans': 'stijn-havermans',
  'Tom Schoonbaert': 'tom-schoonbaert',
  'Jens De Ridder': 'jens-de-ridder',
};
const LINK_URL = {
  'Stijn Havermans': 'https://www.mastercooks.be/',
};

const o = [];
o.push('-- De kaart en het team van Au Vieux Port, zoals het huis ze publiceert.');
o.push('-- Overgenomen van restaurantauvieuxport.be in alle drie de talen.');
o.push('');
o.push('-- De secties opnieuw zetten; menu_items hangt eraan met on delete cascade.');
o.push('delete from menu_items;');
o.push('delete from menu_sections;');
o.push('');
o.push('insert into menu_sections (id, title_nl, title_en, title_fr, note_nl, note_en, note_fr, position) values');
o.push(
  SECTIONS.map((s) =>
    '  (' + [q(s.id), q(s.nl), q(s.en), q(s.fr), q(s.note_nl), q(s.note_en), q(s.note_fr), s.pos].join(', ') + ')'
  ).join(',\n') + ';'
);
o.push('');

o.push('insert into menu_items (section_id, name_nl, name_en, name_fr, price, per_person, requires_preorder, price_note_nl, price_note_en, price_note_fr, position) values');
const rows = ITEMS.map(([sec, nl, en, fr, price, f], i) => {
  const pn = f.pn || [null, null, null];
  return '  (' + [
    q(sec), q(nl), q(en), q(fr),
    price === null ? 'null' : price,
    f.pp ? 'true' : 'false',
    f.pre ? 'true' : 'false',
    q(pn[0]), q(pn[1]), q(pn[2]),
    (i + 1) * 10,
  ].join(', ') + ')';
});
o.push(rows.join(',\n') + ';');
o.push('');

o.push('-- Het team, met de teksten van de bestaande site.');
o.push('delete from team_members;');
o.push('insert into team_members (slug, name, role_nl, role_en, role_fr, bio_nl, bio_en, bio_fr, photo, link_url, link_nl, link_en, link_fr, position) values');
const tRows = Object.entries(team).map(([name, d], i) =>
  '  (' + [
    q(PHOTO[name]), q(name),
    q(d.nl.role), q(d.en.role), q(d.fr.role),
    q(d.nl.bio), q(d.en.bio), q(d.fr.bio),
    q('/img/team/' + PHOTO[name] + '.webp'),
    q(LINK_URL[name] || null),
    q(d.nl.link), q(d.en.link), q(d.fr.link),
    (i + 1) * 10,
  ].join(', ') + ')'
);
o.push(tRows.join(',\n') + ';');
o.push('');

fs.writeFileSync(process.argv[3], o.join('\n'));
console.log('sections: ' + SECTIONS.length + '  items: ' + ITEMS.length + '  team: ' + Object.keys(team).length);
console.log('bytes: ' + fs.statSync(process.argv[3]).size);
