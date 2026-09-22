// Adds the keys the new pages need, without disturbing what is already there.
import fs from 'fs';

const ADD = {
  nl: {
    team: {
      intro: 'Achter elk bord, elke versnijding aan tafel en elk glas staan mensen met vakmanschap. Maak kennis met onze chef, onze maître en onze sommelier.',
      wineLink: 'Bekijk onze wijnkaart',
    },
    gallery: {
      title: 'Het huis in beeld',
      intro: 'De zaal, de kelder en het werk aan tafel.',
    },
    awards: {
      gaultMillau: 'Gault&Millau, 15/20',
      fineDining: 'Fine Dining in Antwerp',
      wineSpectator: 'Wine Spectator',
    },
  },
  en: {
    team: {
      intro: "Behind every plate, every dish carved at the table and every glass are people who master their craft. Meet our chef, our maître d' and our sommelier.",
      wineLink: 'View our wine list',
    },
    gallery: {
      title: 'The house in pictures',
      intro: 'The dining room, the cellar and the work at the table.',
    },
    awards: {
      gaultMillau: 'Gault&Millau, 15/20',
      fineDining: 'Fine Dining in Antwerp',
      wineSpectator: 'Wine Spectator',
    },
  },
  fr: {
    team: {
      intro: "Derrière chaque assiette, chaque découpe en salle et chaque verre, il y a des femmes et des hommes de métier. Faites connaissance avec notre chef, notre maître d'hôtel et notre sommelier.",
      wineLink: 'Voir notre carte des vins',
    },
    gallery: {
      title: 'La maison en images',
      intro: 'La salle, la cave et le travail en salle.',
    },
    awards: {
      gaultMillau: 'Gault&Millau, 15/20',
      fineDining: 'Fine Dining in Antwerp',
      wineSpectator: 'Wine Spectator',
    },
  },
};

for (const [lang, groups] of Object.entries(ADD)) {
  const file = 'src/messages/' + lang + '.json';
  const m = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const [ns, keys] of Object.entries(groups)) {
    m[ns] = { ...(m[ns] ?? {}), ...keys };
  }
  fs.writeFileSync(file, JSON.stringify(m, null, 2) + '\n', 'utf8');
  console.log(lang + ': ' + Object.keys(groups).join(', '));
}
