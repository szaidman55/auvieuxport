// Maakt src/app/favicon.ico uit src/app/icon.png.
//
// Waarom een .ico terwijl er al een icon.png hangt: browsers vragen
// /favicon.ico op uit zichzelf, ook als de pagina een <link rel="icon">
// meegeeft. Zonder dat bestand kwam daar een 404 terug. Safari op iOS is
// daar het slechtst in: die houdt dan soms het pictogram vast dat de tab
// daarvoor toonde.
//
// De .ico draagt drie maten. Dat is geen overdaad: 16 is de tabbalk, 32 de
// snelkoppeling op het bureaublad, 48 de lijst met favorieten. Een enkele
// grote maat laat de browser zelf verkleinen, en dat vervuilt het merk juist
// op de maat waar het het vaakst te zien is.
//
// Draaien na elke wijziging aan icon.png:  node scripts/make-favicon.mjs

import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const BRON = 'src/app/icon.png';
const DOEL = 'src/app/favicon.ico';
const MATEN = [16, 32, 48];

const beelden = await Promise.all(
  MATEN.map((m) => sharp(BRON).resize(m, m, { fit: 'cover' }).png().toBuffer()),
);

// ICONDIR: 2 bytes gereserveerd, 2 bytes type (1 = icoon), 2 bytes aantal.
const kop = Buffer.alloc(6);
kop.writeUInt16LE(0, 0);
kop.writeUInt16LE(1, 2);
kop.writeUInt16LE(beelden.length, 4);

// Elke ingang is 16 bytes en wijst naar de plek van het beeld erachter.
let plek = 6 + 16 * beelden.length;
const ingangen = beelden.map((buf, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(MATEN[i] === 256 ? 0 : MATEN[i], 0);
  e.writeUInt8(MATEN[i] === 256 ? 0 : MATEN[i], 1);
  e.writeUInt8(0, 2); // geen kleurtabel
  e.writeUInt8(0, 3); // gereserveerd
  e.writeUInt16LE(1, 4); // vlakken
  e.writeUInt16LE(32, 6); // bits per beeldpunt
  e.writeUInt32LE(buf.length, 8);
  e.writeUInt32LE(plek, 12);
  plek += buf.length;
  return e;
});

writeFileSync(DOEL, Buffer.concat([kop, ...ingangen, ...beelden]));

const totaal = beelden.reduce((n, b) => n + b.length, 0) + 6 + 16 * beelden.length;
console.log(`${DOEL}: ${MATEN.join(', ')} px, ${totaal} bytes`);
