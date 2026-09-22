'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';
import { revalidate } from '@/lib/revalidate';
import type { Wine, WineSection } from '@/lib/types';

const SIZES = [
  { value: 0.375, label: 'Halve fles' },
  { value: 0.75, label: 'Fles' },
  { value: 1.5, label: 'Magnum' },
  { value: 3, label: 'Jeroboam' },
];

// Ruim 520 referenties. Zonder zoekveld is dat onwerkbaar, dus dat staat
// bovenaan en filtert op producent, naam, streek en land tegelijk.
export function WineEditor() {
  const db = supabaseBrowser();
  const [sections, setSections] = useState<WineSection[]>([]);
  const [wines, setWines] = useState<Wine[]>([]);
  const [dirty, setDirty] = useState<Record<string, Partial<Wine>>>({});
  const [query, setQuery] = useState('');
  const [colour, setColour] = useState<'all' | Wine['colour']>('all');
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const [s, w] = await Promise.all([
      db.from('wine_sections').select('*').order('position'),
      db.from('wines').select('*').order('country').order('region').order('position'),
    ]);
    setSections((s.data ?? []) as WineSection[]);
    setWines((w.data ?? []) as Wine[]);
    setLoading(false);
  }, [db]);

  useEffect(() => {
    void load();
  }, [load]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return wines.filter((w) => {
      if (colour !== 'all' && w.colour !== colour) return false;
      if (!q) return true;
      return [w.producer, w.name, w.region, w.appellation, w.country]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(q));
    });
  }, [wines, query, colour]);

  function edit(id: string, patch: Partial<Wine>) {
    setWines((prev) => prev.map((w) => (w.id === id ? { ...w, ...patch } : w)));
    setDirty((prev) => ({ ...prev, [id]: { ...(prev[id] ?? {}), ...patch } }));
  }

  async function save() {
    const ids = Object.keys(dirty);
    if (ids.length === 0) return;

    setStatus('Bewaren.');
    for (const id of ids) {
      const { error } = await db.from('wines').update(dirty[id]).eq('id', id);
      if (error) {
        setStatus(`Bewaren mislukt: ${error.message}`);
        return;
      }
    }

    setDirty({});
    const note = await revalidate('wines');
    setStatus(`${ids.length} wijziging(en) bewaard.${note ? ' ' + note : ''}`);
  }

  // Een fles die op is, is het moment waarop snelheid telt. Slaat meteen op.
  async function toggleAvailable(wine: Wine) {
    const next = !wine.available;
    setWines((prev) => prev.map((w) => (w.id === wine.id ? { ...w, available: next } : w)));
    const { error } = await db.rpc('set_wine_available', { wine_id: wine.id, value: next });
    if (error) {
      setStatus(`Niet gelukt: ${error.message}`);
      void load();
      return;
    }
    void revalidate('wines');
  }

  async function addWine() {
    const producer = window.prompt('Producent');
    if (!producer) return;

    const { error } = await db.from('wines').insert({
      producer,
      colour: colour === 'all' ? 'red' : colour,
      country: 'Frankrijk',
      bottle: 0,
    });

    if (error) setStatus(`Toevoegen mislukt: ${error.message}`);
    else {
      void load();
      void revalidate('wines');
    }
  }

  if (loading) return <p className="text-sm text-ink-faint">De kelder wordt geladen.</p>;

  const pending = Object.keys(dirty).length;
  const field = 'min-h-11 border border-rule bg-paper px-2 text-sm';

  return (
    <div className="flex flex-col gap-6">
      <div className="sticky top-0 z-10 flex flex-col gap-3 border-b border-rule bg-paper py-3">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-2xl">De kelder</h1>
          <span className="text-sm text-ink-faint">
            {visible.length} van {wines.length} referenties
          </span>
          <button
            type="button"
            onClick={save}
            disabled={pending === 0}
            className="min-h-11 bg-brass px-5 text-sm font-semibold uppercase tracking-wide text-paper disabled:opacity-40"
          >
            Bewaren{pending > 0 ? ` (${pending})` : ''}
          </button>
          <button
            type="button"
            onClick={addWine}
            className="min-h-11 text-sm underline underline-offset-4"
          >
            Wijn toevoegen
          </button>
          {status && (
            <p role="status" className="text-sm text-ink-soft">
              {status}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="wine-search" className="text-xs uppercase tracking-wider text-ink-faint">
              Zoeken
            </label>
            <input
              id="wine-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Producent, streek, appellatie"
              className={`${field} w-64`}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="wine-colour" className="text-xs uppercase tracking-wider text-ink-faint">
              Kleur
            </label>
            <select
              id="wine-colour"
              value={colour}
              onChange={(e) => setColour(e.target.value as typeof colour)}
              className={`${field} w-44`}
            >
              <option value="all">Alle</option>
              {sections.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title_nl}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[60rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-rule text-left text-xs uppercase tracking-wider text-ink-faint">
              <th scope="col" className="py-2 pr-3">Producent</th>
              <th scope="col" className="py-2 pr-3">Naam</th>
              <th scope="col" className="py-2 pr-3">Land</th>
              <th scope="col" className="py-2 pr-3">Streek</th>
              <th scope="col" className="py-2 pr-3">Jaar</th>
              <th scope="col" className="py-2 pr-3">Formaat</th>
              <th scope="col" className="py-2 pr-3">Fles</th>
              <th scope="col" className="py-2 pr-3">Glas</th>
              <th scope="col" className="py-2 pr-3">Op kaart</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((wine) => (
              <tr key={wine.id} className="border-b border-rule/60">
                <td className="py-2 pr-3">
                  <input
                    aria-label="Producent"
                    value={wine.producer}
                    onChange={(e) => edit(wine.id, { producer: e.target.value })}
                    className={`${field} w-40`}
                  />
                </td>
                <td className="py-2 pr-3">
                  <input
                    aria-label="Naam van de wijn"
                    value={wine.name ?? ''}
                    onChange={(e) => edit(wine.id, { name: e.target.value || null })}
                    className={`${field} w-40`}
                  />
                </td>
                <td className="py-2 pr-3">
                  <input
                    aria-label="Land"
                    value={wine.country}
                    onChange={(e) => edit(wine.id, { country: e.target.value })}
                    className={`${field} w-28`}
                  />
                </td>
                <td className="py-2 pr-3">
                  <input
                    aria-label="Streek"
                    value={wine.region ?? ''}
                    onChange={(e) => edit(wine.id, { region: e.target.value || null })}
                    className={`${field} w-32`}
                  />
                </td>
                <td className="py-2 pr-3">
                  <input
                    aria-label="Jaargang, leeg laten voor NV"
                    type="number"
                    min="1900"
                    max="2100"
                    value={wine.vintage ?? ''}
                    placeholder="NV"
                    onChange={(e) =>
                      edit(wine.id, {
                        vintage: e.target.value === '' ? null : Number(e.target.value),
                      })
                    }
                    className={`${field} w-20 tabular-nums`}
                  />
                </td>
                <td className="py-2 pr-3">
                  <select
                    aria-label="Flesformaat"
                    value={Number(wine.bottle_size)}
                    onChange={(e) => edit(wine.id, { bottle_size: Number(e.target.value) })}
                    className={`${field} w-28`}
                  >
                    {SIZES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-2 pr-3">
                  <input
                    aria-label="Prijs per fles"
                    type="number"
                    min="0"
                    step="1"
                    value={wine.bottle}
                    onChange={(e) => edit(wine.id, { bottle: Number(e.target.value) })}
                    className={`${field} w-24 tabular-nums`}
                  />
                </td>
                <td className="py-2 pr-3">
                  <input
                    aria-label="Prijs per glas, leeg als de wijn niet per glas gaat"
                    type="number"
                    min="0"
                    step="0.5"
                    value={wine.glass ?? ''}
                    placeholder="-"
                    onChange={(e) =>
                      edit(wine.id, {
                        glass: e.target.value === '' ? null : Number(e.target.value),
                      })
                    }
                    className={`${field} w-24 tabular-nums`}
                  />
                </td>
                <td className="py-2 pr-3">
                  <button
                    type="button"
                    onClick={() => toggleAvailable(wine)}
                    aria-pressed={wine.available}
                    className={`min-h-11 px-3 text-xs uppercase tracking-wide ${
                      wine.available
                        ? 'border border-rule text-ink-soft'
                        : 'bg-wine text-paper'
                    }`}
                  >
                    {wine.available ? 'Op kaart' : 'Op'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
