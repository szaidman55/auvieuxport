'use client';

import { useCallback, useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';
import type { MenuItem, MenuSection } from '@/lib/types';

type Draft = Partial<MenuItem> & { id: string };

// Het scherm waar de zaal de kaart beheert. Een prijs wijzigen is hier twee
// handelingen: typen en bewaren. Op de oude site was het een bouwer bellen.
export function MenuEditor() {
  const db = supabaseBrowser();
  const [sections, setSections] = useState<MenuSection[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [dirty, setDirty] = useState<Record<string, Draft>>({});
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const [s, i] = await Promise.all([
      db.from('menu_sections').select('*').order('position'),
      db.from('menu_items').select('*').order('position'),
    ]);
    setSections((s.data ?? []) as MenuSection[]);
    setItems((i.data ?? []) as MenuItem[]);
    setLoading(false);
  }, [db]);

  useEffect(() => {
    void load();
  }, [load]);

  function edit(id: string, patch: Partial<MenuItem>) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
    setDirty((prev) => ({ ...prev, [id]: { ...(prev[id] ?? { id }), ...patch } }));
  }

  async function save() {
    const pending = Object.values(dirty);
    if (pending.length === 0) return;

    setStatus('Bewaren.');
    for (const draft of pending) {
      const { id, ...patch } = draft;
      const { error } = await db.from('menu_items').update(patch).eq('id', id);
      if (error) {
        setStatus(`Bewaren mislukt: ${error.message}`);
        return;
      }
    }

    setDirty({});
    setStatus(`${pending.length} wijziging(en) bewaard.`);
  }

  // Uitverkocht is de enige knop die ook de vloer mag gebruiken, en hij slaat
  // meteen op: dat is het moment waarop het ertoe doet.
  async function toggleSoldOut(item: MenuItem) {
    const next = !item.sold_out;
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, sold_out: next } : i)));
    const { error } = await db.from('menu_items').update({ sold_out: next }).eq('id', item.id);
    if (error) {
      setStatus(`Niet gelukt: ${error.message}`);
      void load();
    }
  }

  async function addItem(sectionId: string) {
    const name = window.prompt('Naam van het gerecht (Nederlands)');
    if (!name) return;

    const position =
      Math.max(0, ...items.filter((i) => i.section_id === sectionId).map((i) => i.position)) + 10;

    const { error } = await db
      .from('menu_items')
      .insert({ section_id: sectionId, name_nl: name, position });

    if (error) setStatus(`Toevoegen mislukt: ${error.message}`);
    else void load();
  }

  async function removeItem(item: MenuItem) {
    if (!window.confirm(`${item.name_nl} van de kaart halen?`)) return;
    const { error } = await db.from('menu_items').delete().eq('id', item.id);
    if (error) setStatus(`Verwijderen mislukt: ${error.message}`);
    else void load();
  }

  if (loading) return <p className="text-sm text-ink-faint">De kaart wordt geladen.</p>;

  const pendingCount = Object.keys(dirty).length;
  const field = 'min-h-11 border border-rule bg-paper px-2 text-sm';

  return (
    <div className="flex flex-col gap-10">
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-4 border-b border-rule bg-paper py-3">
        <h1 className="text-2xl">De kaart</h1>
        <button
          type="button"
          onClick={save}
          disabled={pendingCount === 0}
          className="min-h-11 bg-brass px-5 text-sm font-semibold uppercase tracking-wide text-paper disabled:opacity-40"
        >
          Bewaren{pendingCount > 0 ? ` (${pendingCount})` : ''}
        </button>
        {status && (
          <p role="status" className="text-sm text-ink-soft">
            {status}
          </p>
        )}
      </div>

      {sections.map((section) => (
        <section key={section.id}>
          <div className="mb-3 flex flex-wrap items-baseline gap-4">
            <h2 className="text-xl">{section.title_nl}</h2>
            <button
              type="button"
              onClick={() => addItem(section.id)}
              className="min-h-11 text-sm underline underline-offset-4"
            >
              Gerecht toevoegen
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[46rem] border-collapse text-sm">
              <thead>
                <tr className="border-b border-rule text-left text-xs uppercase tracking-wider text-ink-faint">
                  <th scope="col" className="py-2 pr-3">Nederlands</th>
                  <th scope="col" className="py-2 pr-3">Engels</th>
                  <th scope="col" className="py-2 pr-3">Frans</th>
                  <th scope="col" className="py-2 pr-3">Prijs</th>
                  <th scope="col" className="py-2 pr-3">p.p.</th>
                  <th scope="col" className="py-2 pr-3">Vooraf</th>
                  <th scope="col" className="py-2 pr-3">Uitverkocht</th>
                  <th scope="col" className="py-2" />
                </tr>
              </thead>
              <tbody>
                {items
                  .filter((i) => i.section_id === section.id)
                  .map((item) => (
                    <tr key={item.id} className="border-b border-rule/60 align-middle">
                      <td className="py-2 pr-3">
                        <input
                          aria-label="Naam in het Nederlands"
                          value={item.name_nl}
                          onChange={(e) => edit(item.id, { name_nl: e.target.value })}
                          className={`${field} w-48`}
                        />
                      </td>
                      <td className="py-2 pr-3">
                        <input
                          aria-label="Naam in het Engels"
                          value={item.name_en ?? ''}
                          placeholder={item.name_nl}
                          onChange={(e) => edit(item.id, { name_en: e.target.value || null })}
                          className={`${field} w-40`}
                        />
                      </td>
                      <td className="py-2 pr-3">
                        <input
                          aria-label="Naam in het Frans"
                          value={item.name_fr ?? ''}
                          placeholder={item.name_nl}
                          onChange={(e) => edit(item.id, { name_fr: e.target.value || null })}
                          className={`${field} w-40`}
                        />
                      </td>
                      <td className="py-2 pr-3">
                        <input
                          aria-label="Prijs in euro, leeg laten voor dagprijs"
                          type="number"
                          inputMode="decimal"
                          step="0.5"
                          min="0"
                          value={item.price ?? ''}
                          placeholder="dagprijs"
                          onChange={(e) =>
                            edit(item.id, {
                              price: e.target.value === '' ? null : Number(e.target.value),
                            })
                          }
                          className={`${field} w-24 tabular-nums`}
                        />
                      </td>
                      <td className="py-2 pr-3">
                        <input
                          aria-label="Prijs geldt per persoon"
                          type="checkbox"
                          checked={item.per_person}
                          onChange={(e) => edit(item.id, { per_person: e.target.checked })}
                          className="size-5"
                        />
                      </td>
                      <td className="py-2 pr-3">
                        <input
                          aria-label="Moet vooraf besteld worden"
                          type="checkbox"
                          checked={item.requires_preorder}
                          onChange={(e) => edit(item.id, { requires_preorder: e.target.checked })}
                          className="size-5"
                        />
                      </td>
                      <td className="py-2 pr-3">
                        <button
                          type="button"
                          onClick={() => toggleSoldOut(item)}
                          aria-pressed={item.sold_out}
                          className={`min-h-11 px-3 text-xs uppercase tracking-wide ${
                            item.sold_out
                              ? 'bg-wine text-paper'
                              : 'border border-rule text-ink-soft'
                          }`}
                        >
                          {item.sold_out ? 'Uitverkocht' : 'Beschikbaar'}
                        </button>
                      </td>
                      <td className="py-2">
                        <button
                          type="button"
                          onClick={() => removeItem(item)}
                          className="min-h-11 text-xs text-wine underline underline-offset-4"
                        >
                          Verwijderen
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
