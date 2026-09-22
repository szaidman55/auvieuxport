// Brings the restaurant's own images from the old site into public/.
// Run once from the scratch copy; the results are committed.
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SRC = process.argv[2];
const OUT = path.join(process.cwd(), 'public', 'img');

const BRAND = {
  'logo.png': 'brand/logo.png',
  '250943481437-gm15.png': 'brand/gault-millau-15.png',
  '461-finedining.png': 'brand/fine-dining-antwerp.png',
  'ws2022-web-17889834344805.jpg': 'brand/wine-spectator-2022.jpg',
  'ws2023-web-17889834346662.jpg': 'brand/wine-spectator-2023.jpg',
  'ws2024-web-17889834344727.jpg': 'brand/wine-spectator-2024.jpg',
  'ws2025-web-17889834345136.jpg': 'brand/wine-spectator-2025.jpg',
  'ws2026-web-17889834346589.jpg': 'brand/wine-spectator-2026.jpg',
};

const TEAM = {
  'team-stijn-havermans-17896612904592.jpg': 'team/stijn-havermans.jpg',
  'team-tom-schoonbaert-17896612904524.jpg': 'team/tom-schoonbaert.jpg',
  'team-jens-de-ridder-17896612905176.jpg': 'team/jens-de-ridder.jpg',
};

const CANARD = {
  'r259-rouennaise-1-pers-17891654885112.webp': 'canard/1-pers.webp',
  '554-rouennaise-2-versnijden-17892314376744.webp': 'canard/2-versnijden.webp',
  '558-rouennaise-3-saus-17891651391757.webp': 'canard/3-saus.webp',
  '562-rouennaise-4-bord-17891651651695.webp': 'canard/4-bord.webp',
};

async function copyAs(from, to) {
  const dst = path.join(OUT, to);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(path.join(SRC, from), dst);
  return dst;
}

async function resize(from, to, width, opts = {}) {
  const dst = path.join(OUT, to);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  let img = sharp(path.join(SRC, from)).rotate();
  const meta = await img.metadata();
  if (meta.width > width) img = img.resize({ width, withoutEnlargement: true });
  await img.webp({ quality: opts.quality ?? 78 }).toFile(dst);
  const out = await sharp(dst).metadata();
  return { dst, w: out.width, h: out.height, kb: Math.round(fs.statSync(dst).size / 1024) };
}

const report = [];

for (const [from, to] of Object.entries(BRAND)) {
  if (!fs.existsSync(path.join(SRC, from))) { report.push('MISSING ' + from); continue; }
  await copyAs(from, to);
  report.push('brand  ' + to);
}

for (const [from, to] of Object.entries(TEAM)) {
  if (!fs.existsSync(path.join(SRC, from))) { report.push('MISSING ' + from); continue; }
  const r = await resize(from, to.replace(/\.jpg$/, '.webp'), 720, { quality: 82 });
  report.push('team   ' + path.relative(OUT, r.dst) + '  ' + r.w + 'x' + r.h + '  ' + r.kb + 'kB');
}

for (const [from, to] of Object.entries(CANARD)) {
  if (!fs.existsSync(path.join(SRC, from))) { report.push('MISSING ' + from); continue; }
  const r = await resize(from, to, 1200);
  report.push('canard ' + path.relative(OUT, r.dst) + '  ' + r.w + 'x' + r.h + '  ' + r.kb + 'kB');
}

// every remaining photograph, numbered; the originals have no meaningful names
const photos = fs.readdirSync(SRC).filter((f) => /^(440-|r1\d\d-|r221-|153-)/.test(f));
photos.sort();
let n = 0;
for (const f of photos) {
  n += 1;
  const name = 'photos/avp-' + String(n).padStart(2, '0') + '.webp';
  const r = await resize(f, name, 1600);
  report.push('photo  ' + path.relative(OUT, r.dst) + '  ' + r.w + 'x' + r.h + '  ' + r.kb + 'kB  <- ' + f);
}

console.log(report.join('\n'));
console.log('\nphotos: ' + n);
