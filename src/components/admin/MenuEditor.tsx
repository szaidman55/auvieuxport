'use client';

import { useCallback, useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';
import type { MenuItem, MenuSection } from '@/lib/types';
import { SectionHeader } from './SectionHeader';

type ItemDraft = Partial<MenuItem> & { id: string };
type SectionDraft = Partial<MenuSection> & { id: string };

/**
 * Van een titel een id maken.
 *
 * De sleutel van een sectie is tekst, geen willekeurig nummer, want ze komt
 * in geen enkele URL terecht maar wel in elke foutmelding en elke rij van
 * menu_items. "Suggesties van de week" leest daar beter dan een uuid.
 */
function slugify(title: string, taken: string[]): string {
  const base =
    title
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 40) || 'sectie';

  if (!taken.includes(base)) return base;
  for (let n = 2; n < 100; n += 1) {
    if (!taken.includes(`${base}-${n}`)) return `${base}-${n}`;
  }
  return `${base}-${Date.now()}`;
}

// Het scherm waar de zaal de kaart beheert. Een prijs wijzigen is hier twee
// handelingen: typen en bewaren. Op de oude site was het een bouwer bellen.
//
// Hetzelfde scherm draait de suggesties. Het verschil is welke secties het
// toont: die met de vlag, of die zonder. Een suggestie is immers een gerecht,
// alleen met een kortere houdbaarheid.
export function MenuEditor({ mode = 'menu' }: { mode?: 'menu' | 'suggestions' }) {
  const db = supabaseBrowser();
  const suggestions = mode === 'suggestions';

  const [sections, setSections] = useState<MenuSection[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [dirtyItems, setDirtyItems] = useState<Record<string, ItemDraft>>({});
  const [dirtySections, setDirtySections] = useState<Record<string, SectionDraft>>({});
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

  const mine = sections.filter((s) => Boolean(s.is_suggestion) === suggestions);

  function editItem(id: string, patch: Partial<MenuItem>) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
    setDirtyItems((prev) => ({ ...prev, [id]: { ...(prev[id] ?? { id }), ...patch } }));
  }

  function editSection(id: string, patch: Partial<MenuSection>) {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
    setDirtySections((prev) => ({ ...prev, [id]: { ...(prev[id] ?? { id }), ...patch } }));
  }

  const pendingCount = Object.keys(dirtyItems).length + Object.keys(dirtySections).length;

  async function save() {
    if (pendingCount === 0) return;
    setStatus('Bewaren.');

    for (const draft of Object.values(dirtySections)) {
      const { id, ...patch } = draft;
      const { error } = await db.from('menu_sections').update(patch).eq('id', id);
      if (error) {
        setStatus(`Bewaren mislukt: ${error.message}`);
        return;
      }
    }

    for (const draft of Object.values(dirtyItems)) {
      const { id, ...patch } = draft;
      const { error } = await db.from('menu_items').update(patch).eq('id', id);
      if (error) {
        setStatus(`Bewaren mislukt: ${error.message}`);
        return;
      }
    }

    const n = pendingCount;
    setDirtyItems({});
    setDirtySections({});
    setStatus(`${n} wijziging(en) bewaard.`);
  }

  // Uitverkocht is de enige knop die ook de vloer mag gebruiken, en hij slaat
  // meteen op: dat is het moment waarop het ertoe doet.
  async function toggleSoldOut(item: MenuItem) {
    const next = !item.sold_out;
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, sold_out: next } : i)));
    const { error } = await db.rpc('set_menu_item_sold_out', { item_id: item.id, value: next });
    if (error) {
      setStatus(`Niet gelukt: ${error.message}`);
      void load();
    }
  }

  async function addSection() {
    const title = window.prompt(
      suggestions ? 'Naam van de suggestiekaart (Nederlands)' : 'Naam van de sectie (Nederlands)',
    );
    if (!title?.trim()) return;

    const id = slugify(title, sections.map((s) => s.id));
    const position = Math.max(0, ...sections.map((s) => s.position)) + 10;

    const { error } = await db.from('menu_sections').insert({
      id,
      title_nl: title.trim(),
      position,
      published: true,
      is_suggestion: suggestions,
    });

    if (error) setStatus(`Toevoegen mislukt: ${error.message}`);
    else {
      setStatus(`Sectie "${title.trim()}" toegevoegd.`);
      void load();
    }
  }

  // Van plaats wisselen met de buur in dit scherm. Alleen binnen de eigen
  // lijst, zodat de suggesties de voorgerechten niet ongemerkt verspringen.
  async function moveSection(section: MenuSection, direction: -1 | 1) {
    const index = mine.findIndex((s) => s.id === section.id);
    const neighbour = mine[index + direction];
    if (!neighbour) return;

    const [a, b] = [section.position, neighbour.position];
    // Gelijke posities zouden de volgorde aan het toeval overlaten.
    const [next, other] = a === b ? [b + direction * 5, b] : [b, a];

    setSections((prev) =>
      [...prev]
        .map((s) =>
          s.id === section.id
            ? { ...s, position: next }
            : s.id === neighbour.id
              ? { ...s, position: other }
              : s,
        )
        .sort((x, y) => x.position - y.position),
    );

    const results = await Promise.all([
      db.from('menu_sections').update({ position: next }).eq('id', section.id),
      db.from('menu_sections').update({ position: other }).eq('id', neighbour.id),
    ]);
    const failed = results.find((r) => r.error);
    if (failed?.error) {
      setStatus(`Volgorde niet bewaard: ${failed.error.message}`);
      void load();
    }
  }

  async function togglePublished(section: MenuSection) {
    const next = !section.published;
    setSections((prev) => prev.map((s) => (s.id === section.id ? { ...s, published: next } : s)));
    const { error } = await db
      .from('menu_sections')
      .update({ published: next })
      .eq('id', section.id);
    if (error) {
      setStatus(`Niet gelukt: ${error.message}`);
      void load();
    }
  }

  async function removeSection(section: MenuSection) {
    const count = items.filter((i) => i.section_id === section.id).length;
    const warning =
      count === 0
        ? `"${section.title_nl}" verwijderen?`
        : `"${section.title_nl}" verwijderen? De ${count} gerecht(en) erin gaan mee en zijn niet terug te halen.`;
    if (!window.confirm(warning)) return;

    const { error } = await db.from('menu_sections').delete().eq('id', section.id);
    if (error) setStatus(`Verwijderen mislukt: ${error.message}`);
    else {
      setStatus(`"${section.title_nl}" verwijderd.`);
      void load();
    }
  }

  // Van plaats wisselen met de buur binnen dezelfde sectie. Zelfde afspraak
  // als bij de secties: dit is structuur, dus het slaat meteen op en hangt
  // niet in de bewaarknop.
  async function moveItem(item: MenuItem, direction: -1 | 1) {
    const rows = items
      .filter((i) => i.section_id === item.section_id)
      .sort((a, b) => a.position - b.position);

    const index = rows.findIndex((i) => i.id === item.id);
    const neighbour = rows[index + direction];
    if (!neighbour) return;

    const [a, b] = [item.position, neighbour.position];
    // Gelijke posities zouden de volgorde aan het toeval overlaten.
    const [next, other] = a === b ? [b + direction * 5, b] : [b, a];

    setItems((prev) =>
      [...prev]
        .map((i) =>
          i.id === item.id
            ? { ...i, position: next }
            : i.id === neighbour.id
              ? { ...i, position: other }
              : i,
        )
        .sort((x, y) => x.position - y.position),
    );

    const results = await Promise.all([
      db.from('menu_items').update({ position: next }).eq('id', item.id),
      db.from('menu_items').update({ position: other }).eq('id', neighbour.id),
    ]);
    const failed = results.find((r) => r.error);
    if (failed?.error) {
      setStatus(`Volgorde niet bewaard: ${failed.error.message}`);
      void load();
    }
  }

  async function addItem(sectionId: string) {
    const name = window.prompt('Naam van het gerecht (Nederlands)');
    if (!name?.trim()) return;

    const position =
      Math.max(0, ...items.filter((i) => i.section_id === sectionId).map((i) => i.position)) + 10;

    const { error } = await db
      .from('menu_items')
      .insert({ section_id: sectionId, name_nl: name.trim(), position });

    if (error) setStatus(`Toevoegen mislukt: ${error.message}`);
    else void load();
  }

  async function removeItem(item: MenuItem) {
    if (!window.confirm(`${item.name_nl} van de kaart halen?`)) return;
    const { error } = await db.from('menu_items').delete().eq('id', item.id);
    if (error) setStatus(`Verwijderen mislukt: ${error.message}`);
    else void load();
  }

  if (loading) return <p className="text-sm text-ink-faint">Even geduld.</p>;

  const field = 'min-h-11 border border-rule bg-paper px-2 text-sm';

  return (
    <div className="flex flex-col gap-10">
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-4 border-b border-rule bg-paper py-3">
        <h1 className="text-2xl">{suggestions ? 'Suggesties' : 'De kaart'}</h1>
        <button
          type="button"
          onClick={save}
          disabled={pendingCount === 0}
          className="min-h-11 bg-brass px-5 text-sm font-semibold uppercase tracking-wide text-paper disabled:opacity-40"
        >
          Bewaren{pendingCount > 0 ? ` (${pendingCount})` : ''}
        </button>
        <button
          type="button"
          onClick={addSection}
          className="min-h-11 border border-rule px-4 text-sm"
        >
          Sectie toevoegen
        </button>
        {status && (
          <p role="status" className="text-sm text-ink-soft">
            {status}
          </p>
        )}
      </div>

      {mine.length === 0 && (
        <p className="max-w-prose text-ink-soft">
          {suggestions
            ? 'Nog geen suggestiekaart. Maak er een met "Sectie toevoegen"; ze verschijnt op de site zodra er een gerecht in staat.'
            : 'Nog geen secties op de kaart.'}
        </p>
      )}

      {mine.map((section, index) => {
        const rows = items.filter((i) => i.section_id === section.id);

        return (
        <section key={section.id}>
          <SectionHeader
            section={section}
            itemCount={rows.length}
            first={index === 0}
            last={index === mine.length - 1}
            onEdit={(patch) => editSection(section.id, patch)}
            onMove={(direction) => moveSection(section, direction)}
            onTogglePublished={() => togglePublished(section)}
            onRemove={() => removeSection(section)}
            onAddItem={() => addItem(section.id)}
          />

          <div className="overflow-x-auto">
            <table className="w-full min-w-[46rem] border-collapse text-sm">
              <thead>
                <tr className="border-b border-rule text-left text-xs uppercase tracking-wider text-ink-faint">
                  <th scope="col" className="py-2 pr-3">
                    <span className="sr-only">Volgorde</span>
                  </th>
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
                {rows.map((item, row) => (
                    <tr key={item.id} className="border-b border-rule/60 align-middle">
                      <td className="py-2 pr-3">
                        <span className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => moveItem(item, -1)}
                            disabled={row === 0}
                            aria-label={`${item.name_nl} naar boven`}
                            className="flex size-11 items-center justify-center border border-rule text-sm disabled:opacity-30"
                          >
                            &uarr;
                          </button>
                          <button
                            type="button"
                            onClick={() => moveItem(item, 1)}
                            disabled={row === rows.length - 1}
                            aria-label={`${item.name_nl} naar beneden`}
                            className="flex size-11 items-center justify-center border border-rule text-sm disabled:opacity-30"
                          >
                            &darr;
                          </button>
                        </span>
                      </td>
                      <td className="py-2 pr-3">
                        <input
                          aria-label="Naam in het Nederlands"
                          value={item.name_nl}
                          onChange={(e) => editItem(item.id, { name_nl: e.target.value })}
                          className={`${field} w-48`}
                        />
                      </td>
                      <td className="py-2 pr-3">
                        <input
                          aria-label="Naam in het Engels"
                          value={item.name_en ?? ''}
                          placeholder={item.name_nl}
                          onChange={(e) => editItem(item.id, { name_en: e.target.value || null })}
                          className={`${field} w-40`}
                        />
                      </td>
                      <td className="py-2 pr-3">
                        <input
                          aria-label="Naam in het Frans"
                          value={item.name_fr ?? ''}
                          placeholder={item.name_nl}
                          onChange={(e) => editItem(item.id, { name_fr: e.target.value || null })}
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
                            editItem(item.id, {
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
                          onChange={(e) => editItem(item.id, { per_person: e.target.checked })}
                          className="size-5"
                        />
                      </td>
                      <td className="py-2 pr-3">
                        <input
                          aria-label="Moet vooraf besteld worden"
                          type="checkbox"
                          checked={item.requires_preorder}
                          onChange={(e) =>
                            editItem(item.id, { requires_preorder: e.target.checked })
                          }
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
        );
      })}
    </div>
  );
}
