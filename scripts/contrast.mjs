// Contrastverhouding volgens WCAG 2.1, zodat een warmere achtergrond een
// mening blijft en geen gok.
//
// De norm: 4,5 voor gewone tekst. ink-faint en brass zakken daar nu al onder,
// ook op de huidige bijna witte achtergrond. Dit script zoekt hoeveel donkerder
// ze moeten om te slagen op de beige die we willen.
const lum = (hex) => {
  const c = hex.replace('#', '');
  const v = [0, 2, 4].map((i) => {
    const s = parseInt(c.slice(i, i + 2), 16) / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};
const hex = (r, g, b) =>
  '#' + [r, g, b].map((n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0')).join('');
const parse = (h) => {
  const c = h.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(c.slice(i, i + 2), 16));
};

/** Donkerder maken met behoud van de kleurverhouding, tot het haalt. */
function darkenUntil(start, bg, target) {
  const rgb = parse(start);
  for (let step = 0; step <= 100; step += 1) {
    const f = 1 - step / 100;
    const test = hex(rgb[0] * f, rgb[1] * f, rgb[2] * f);
    if (ratio(test, bg) >= target) return { hex: test, ratio: ratio(test, bg), step };
  }
  return null;
}

const PAPER = '#F3EDE2';
const PAPER2 = '#E7DDCB';

console.log('gekozen beige:  paper ' + PAPER + '   paper-2 ' + PAPER2 + '\n');

const FIX = [
  ['ink-faint', '#7c6f6c'],
  ['brass', '#8a6a33'],
];

for (const [naam, huidig] of FIX) {
  const nuPaper = ratio(huidig, '#f6f3f3');
  const nuPaper2 = ratio(huidig, '#ede8e7');
  const opl = darkenUntil(huidig, PAPER2, 4.5);
  console.log(naam);
  console.log('  nu      ' + huidig + '   op wit ' + nuPaper.toFixed(2) + '   op band ' + nuPaper2.toFixed(2));
  console.log('  nodig   ' + opl.hex + '   op beige ' + ratio(opl.hex, PAPER).toFixed(2) +
              '   op band ' + opl.ratio.toFixed(2) + '   (' + opl.step + '% donkerder)');
}

console.log('\ncontrole van de rest op de nieuwe beige:');
for (const [naam, fg] of Object.entries({ ink: '#1b1615', 'ink-soft': '#574c4a', wine: '#7a1f2b' })) {
  console.log('  ' + naam.padEnd(10) + 'paper ' + ratio(fg, PAPER).toFixed(2) +
              '   paper-2 ' + ratio(fg, PAPER2).toFixed(2));
}
