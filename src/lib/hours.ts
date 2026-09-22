import type { OpeningHour } from '@/lib/types';

export type DayHours = { weekday: number; services: OpeningHour[] };

// Groepeert per dag en houdt de dagen zonder diensten erbij, zodat de site
// kan zeggen dat het huis dan gesloten is in plaats van de dag weg te laten.
export function groupByDay(hours: OpeningHour[]): DayHours[] {
  return [1, 2, 3, 4, 5, 6, 7].map((weekday) => ({
    weekday,
    services: hours.filter((h) => h.weekday === weekday),
  }));
}

export function closedWeekdays(hours: OpeningHour[]): number[] {
  return [1, 2, 3, 4, 5, 6, 7].filter((d) => !hours.some((h) => h.weekday === d));
}

export function hhmm(time: string): string {
  return time.slice(0, 5);
}

// Alleen gebruikt in een client component, zodat de serverrender niet
// afhangt van het moment van bouwen.
//
// De klok van het huis, niet die van de bezoeker: het restaurant staat in
// Antwerpen. Met de lokale tijd van de browser zou een gast in New York om
// half acht 's avonds te horen krijgen dat het gesloten is terwijl de zaal
// vol zit, en omgekeerd.
const BRUSSELS = 'Europe/Brussels';

function inBrussels(now: Date): { weekday: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: BRUSSELS,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  const order = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return {
    weekday: order.indexOf(get('weekday')) + 1,
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  };
}

export function isOpenAt(hours: OpeningHour[], now: Date): boolean {
  const { weekday, minutes } = inBrussels(now);

  return hours.some((h) => {
    if (h.weekday !== weekday) return false;
    const [oh, om] = h.opens.split(':').map(Number);
    const [ch, cm] = h.closes.split(':').map(Number);
    return minutes >= oh * 60 + om && minutes < ch * 60 + cm;
  });
}

export type HoursSummary = { from: number; to: number; times: string[] };

/**
 * De uren in één regel, voor de startpagina.
 *
 * Daar stond "ma - vr 12:00 - 14:00 & 18:00 - 21:30" als vaste tekst in de
 * pagina: Nederlandse dagafkortingen op de Franse en de Engelse site, en een
 * uur dat niet meeveranderde als het in /admin werd aangepast.
 *
 * Geeft null zodra de week niet in één regel te vatten is - dus als de open
 * dagen geen aaneengesloten reeks vormen, of als niet elke open dag dezelfde
 * diensten heeft. Dan is de tabel in de voet het enige eerlijke antwoord.
 */
export function summarise(hours: OpeningHour[]): HoursSummary | null {
  const open = [1, 2, 3, 4, 5, 6, 7].filter((d) => hours.some((h) => h.weekday === d));
  if (open.length === 0) return null;

  const from = open[0];
  const to = open[open.length - 1];
  if (to - from + 1 !== open.length) return null;

  const times = (d: number) =>
    hours
      .filter((h) => h.weekday === d)
      .map((h) => `${hhmm(h.opens)} - ${hhmm(h.closes)}`)
      .join('|');

  const first = times(from);
  if (open.some((d) => times(d) !== first)) return null;

  return { from, to, times: first.split('|') };
}
