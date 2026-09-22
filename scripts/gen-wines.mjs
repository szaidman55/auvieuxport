// Turns the parsed wine list into seed SQL.
// Source: WineList_AVP_Website.pdf, 50 pages, 1 September 2026.
import fs from 'fs';

const wines = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const q = (v) => (v === null || v === undefined || v === '' ? 'null' : "'" + String(v).replace(/'/g, "''") + "'");
const arr = (a) =>
  !a || a.length === 0
    ? "'{}'"
    : "ARRAY[" + a.map((x) => q(x)).join(',') + "]::text[]";

const out = [];
out.push('-- De wijnkaart van Au Vieux Port, overgenomen uit WineList_AVP_Website.pdf');
out.push("-- (50 pagina's, 1 september 2026). " + wines.length + ' referenties.');
out.push('--');
out.push('-- De volgorde van de kaart is de volgorde van het huis: per kleur, dan per');
out.push('-- land en streek, en binnen een producent zoals de sommelier ze zet. Die');
out.push('-- volgorde staat in position, zodat de site de kaart toont zoals ze bedoeld is.');
out.push('');
out.push('-- Dit vervangt de wijnen volledig. Bedoeld voor de eerste vulling.');
out.push('truncate table wines;');
out.push('');

const COLS = '(colour, producer, name, country, region, appellation, grapes, vintage, bottle_size, bottle, tasting_note, position)';
const CHUNK = 50;
for (let i = 0; i < wines.length; i += CHUNK) {
  const slice = wines.slice(i, i + CHUNK);
  out.push('insert into wines ' + COLS + ' values');
  const rows = slice.map((w, k) => {
    const pos = i + k;
    return (
      '  (' +
      [
        q(w.colour),
        q(w.producer),
        q(w.name),
        q(w.country),
        q(w.region),
        q(w.appellation),
        arr(w.grapes),
        w.vintage === null ? 'null' : w.vintage,
        w.bottle_size,
        w.bottle,
        q(w.tasting_note),
        pos,
      ].join(', ') +
      ')'
    );
  });
  out.push(rows.join(',\n') + ';');
  out.push('');
}

fs.writeFileSync(process.argv[3], out.join('\n'));
console.log('rows: ' + wines.length);
console.log('bytes: ' + fs.statSync(process.argv[3]).size);
