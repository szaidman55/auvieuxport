'use client';

import { useCallback, useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';
import type { OpeningHour } from '@/lib/types';

const DAYS = [
  'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag',
];
const SERVICES: OpeningHour['service'][] = ['lunch', 'dinner'];
const LABELS: Record<OpeningHour['service'], string> = { lunch: 'Lunch', dinner: 'Diner' };

// Een dag zonder rijen is een gesloten dag. De site leidt daar zelf uit af dat
// het huis dan dicht is, en zegt dat ook met zoveel woorden.
export function HoursEditor() {
  const db = supabaseBrowser();
  const [hours, setHours] = useState<OpeningHour[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data } = await db.from('opening_hours').select('*').order('weekday').order('opens');
    setHours((data ?? []) as OpeningHour[]);
    setLoading(false);
  }, [db]);

  useEffect(() => {
    void load();
  }, [load]);

  function find(weekday: number, service: OpeningHour['service']) {
    return hours.find((h) => h.weekday === weekday && h.service === service);
  }

  async function setService(
    weekday: number,
    service: OpeningHour['service'],
    patch: { opens?: string; closes?: string } | null,
  ) {
    if (patch === null) {
      setStatus('Bewaren.');
      const { error } = await db
        .from('opening_hours')
        .delete()
        .eq('weekday', weekday)
        .eq('service', service);
      setStatus(error ? `Niet gelukt: ${error.message}` : 'Bewaard.');
      void load();
      return;
    }

    const current = find(weekday, service);
    const row = {
      weekday,
      service,
      opens: patch.opens ?? current?.opens ?? (service === 'lunch' ? '12:00' : '18:00'),
      closes: patch.closes ?? current?.closes ?? (service === 'lunch' ? '14:00' : '21:30'),
    };

    setHours((prev) => [
      ...prev.filter((h) => !(h.weekday === weekday && h.service === service)),
      row,
    ]);

    setStatus('Bewaren.');
    const { error } = await db.from('opening_hours').upsert(row, { onConflict: 'weekday,service' });
    setStatus(error ? `Niet gelukt: ${error.message}` : 'Bewaard.');
  }

  if (loading) return <p className="text-sm text-ink-faint">De uren worden geladen.</p>;

  const field = 'min-h-11 border border-rule bg-paper px-2 text-sm tabular-nums';

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-baseline gap-4">
        <h1 className="text-2xl">Openingsuren</h1>
        {status && (
          <p role="status" className="text-sm text-ink-soft">
            {status}
          </p>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-rule text-left text-xs uppercase tracking-wider text-ink-faint">
              <th scope="col" className="py-2 pr-4">Dag</th>
              <th scope="col" className="py-2 pr-4">Dienst</th>
              <th scope="col" className="py-2 pr-4">Van</th>
              <th scope="col" className="py-2 pr-4">Tot</th>
              <th scope="col" className="py-2" />
            </tr>
          </thead>
          <tbody>
            {DAYS.map((day, index) => {
              const weekday = index + 1;
              return SERVICES.map((service) => {
                const row = find(weekday, service);
                return (
                  <tr key={`${weekday}-${service}`} className="border-b border-rule/60">
                    <td className="py-2 pr-4">{service === 'lunch' ? day : ''}</td>
                    <td className="py-2 pr-4 text-ink-soft">{LABELS[service]}</td>
                    <td className="py-2 pr-4">
                      <input
                        aria-label={`${day} ${LABELS[service]} van`}
                        type="time"
                        value={row?.opens.slice(0, 5) ?? ''}
                        onChange={(e) => setService(weekday, service, { opens: e.target.value })}
                        className={`${field} w-28`}
                      />
                    </td>
                    <td className="py-2 pr-4">
                      <input
                        aria-label={`${day} ${LABELS[service]} tot`}
                        type="time"
                        value={row?.closes.slice(0, 5) ?? ''}
                        onChange={(e) => setService(weekday, service, { closes: e.target.value })}
                        className={`${field} w-28`}
                      />
                    </td>
                    <td className="py-2">
                      {row && (
                        <button
                          type="button"
                          onClick={() => setService(weekday, service, null)}
                          className="min-h-11 text-xs text-wine underline underline-offset-4"
                        >
                          Gesloten
                        </button>
                      )}
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      </div>

      <p className="max-w-prose text-sm text-ink-faint">
        Een dienst zonder uren telt als gesloten. Staan beide diensten van een dag
        leeg, dan meldt de site die dag als gesloten en geeft ze dat ook zo door
        aan Google.
      </p>
    </div>
  );
}
