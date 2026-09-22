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
export function isOpenAt(hours: OpeningHour[], now: Date): boolean {
  const weekday = now.getDay() === 0 ? 7 : now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();

  return hours.some((h) => {
    if (h.weekday !== weekday) return false;
    const [oh, om] = h.opens.split(':').map(Number);
    const [ch, cm] = h.closes.split(':').map(Number);
    return minutes >= oh * 60 + om && minutes < ch * 60 + cm;
  });
}
