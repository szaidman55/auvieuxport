import fs from 'fs';

const ADD = {
  nl: {
    searchLabel: 'Zoek in de kelder',
    searchPlaceholder: 'Producent, streek, druif of jaar',
    found: '{count} van de kaart',
  },
  en: {
    searchLabel: 'Search the cellar',
    searchPlaceholder: 'Producer, region, grape or vintage',
    found: '{count} on the list',
  },
  fr: {
    searchLabel: 'Chercher dans la cave',
    searchPlaceholder: 'Producteur, région, cépage ou millésime',
    found: '{count} sur la carte',
  },
};

for (const [lang, keys] of Object.entries(ADD)) {
  const file = 'src/messages/' + lang + '.json';
  const m = JSON.parse(fs.readFileSync(file, 'utf8'));
  m.wine = { ...(m.wine ?? {}), ...keys };
  fs.writeFileSync(file, JSON.stringify(m, null, 2) + '\n', 'utf8');
  console.log(lang + ' wine: ' + Object.keys(m.wine).join(', '));
}
