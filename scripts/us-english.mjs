// De Engelse tekst van het huis op Amerikaanse spelling, op vraag van Sacha.
//
// Alleen wat een gast leest. Niet de kolomnaam colour, niet de helper
// localised, niet de variabele neighbour: dat zijn namen in de code en in het
// databaseschema, en die hernoemen raakt geen enkel woord op de site terwijl
// het wel de hele kelder en de importscripts breekt.
//
// Elke vervanging draagt genoeg context om zeker te zijn van de taal. Dat is
// niet overdreven voorzichtig: "centre" staat twee keer in deze seed, een keer
// in de Engelse bio van Jens en een keer in de Franse, waar het gewoon Frans
// is en moet blijven staan.
import fs from 'fs';

const FILE = 'supabase/seed_content.sql';

const SWAPS = [
  ['and then specialised at Ter Duinen', 'and then specialized at Ter Duinen'],
  ['he added a specialisation year in beverages', 'he added a specialization year in beverages'],
  ['and a great honour to represent Belgian gastronomy', 'and a great honor to represent Belgian gastronomy'],
  ['Ask him for his favourites', 'Ask him for his favorites'],
  ['where wine takes centre stage', 'where wine takes center stage'],
];

let sql = fs.readFileSync(FILE, 'utf8');
let changed = 0;

for (const [from, to] of SWAPS) {
  const hits = sql.split(from).length - 1;
  if (hits === 0) {
    console.log('NIET GEVONDEN: ' + from);
    continue;
  }
  if (hits > 1) {
    console.log('MEER DAN EEN TREFFER (' + hits + '), overgeslagen: ' + from);
    continue;
  }
  sql = sql.replace(from, to);
  changed += 1;
  console.log('ok  ' + from.slice(0, 48) + ' -> ' + to.slice(0, 48));
}

fs.writeFileSync(FILE, sql, 'utf8');
console.log('\nvervangen: ' + changed + ' van ' + SWAPS.length);

// Het Franse "au centre de tout" moet er nog staan.
const frenchIntact = sql.includes('au centre de tout');
console.log('Frans "au centre de tout" ongemoeid: ' + (frenchIntact ? 'ja' : 'NEE, KIJK NA'));
