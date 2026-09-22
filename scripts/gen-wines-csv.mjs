// Same wine data as the seed SQL, as a CSV for Supabase's table import.
import fs from 'fs';

const wines = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));

const cell = (v) => {
  if (v === null || v === undefined) return '';
  const s = String(v);
  return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
};

// Postgres array literal: {"Pinot Noir","Chardonnay"}
const pgArray = (a) => {
  if (!a || a.length === 0) return '{}';
  const items = a.map((x) => '"' + String(x).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"');
  return '{' + items.join(',') + '}';
};

const cols = ['colour', 'producer', 'name', 'country', 'region', 'appellation',
  'grapes', 'vintage', 'bottle_size', 'bottle', 'tasting_note', 'position'];

const lines = [cols.join(',')];
wines.forEach((w, i) => {
  lines.push([
    cell(w.colour), cell(w.producer), cell(w.name), cell(w.country),
    cell(w.region), cell(w.appellation), cell(pgArray(w.grapes)),
    cell(w.vintage), w.bottle_size, w.bottle, cell(w.tasting_note), i,
  ].join(','));
});

fs.writeFileSync(process.argv[3], lines.join('\n'), 'utf8');
console.log('rows: ' + wines.length + '  bytes: ' + fs.statSync(process.argv[3]).size);
