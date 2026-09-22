'use client';

import { useCallback, useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';
import type { TeamMember } from '@/lib/types';
import { revalidate } from '@/lib/revalidate';

type Draft = Partial<TeamMember> & { id: string };

// Het team was het enige op de site zonder beheerscherm.
//
// Dat viel pas op toen er een fout in een bio bleek te staan: "Book a table",
// de reserveerknop van de oude site, meegesleurd bij het overnemen van de
// teksten. Er was geen enkele manier om dat vanuit het beheer weg te halen,
// dus moest het met SQL in Supabase. En een wijziging langs die weg laat de
// site koud: het verversen hangt aan dit scherm, niet aan de database.
//
// Vandaar dit scherm. Niet omdat bio's vaak veranderen, maar omdat een tekst
// die alleen met SQL te repareren valt geen tekst van het huis is.
export function TeamEditor() {
  const db = supabaseBrowser();
  const [people, setPeople] = useState<TeamMember[]>([]);
  const [dirty, setDirty] = useState<Record<string, Draft>>({});
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data } = await db.from('team_members').select('*').order('position');
    setPeople((data ?? []) as TeamMember[]);
    setLoading(false);
  }, [db]);

  useEffect(() => {
    void load();
  }, [load]);

  function edit(id: string, patch: Partial<TeamMember>) {
    setPeople((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
    setDirty((prev) => ({ ...prev, [id]: { ...(prev[id] ?? { id }), ...patch } }));
  }

  const pending = Object.keys(dirty).length;

  async function save() {
    if (pending === 0) return;
    setStatus('Bewaren.');

    for (const draft of Object.values(dirty)) {
      const { id, ...patch } = draft;
      const { error } = await db.from('team_members').update(patch).eq('id', id);
      if (error) {
        setStatus(`Bewaren mislukt: ${error.message}`);
        return;
      }
    }

    const n = pending;
    setDirty({});
    const note = await revalidate('team');
    setStatus(`${n} wijziging(en) bewaard.${note ? ' ' + note : ''}`);
  }

  async function togglePublished(person: TeamMember) {
    const next = !person.published;
    setPeople((prev) => prev.map((p) => (p.id === person.id ? { ...p, published: next } : p)));
    const { error } = await db
      .from('team_members')
      .update({ published: next })
      .eq('id', person.id);
    if (error) {
      setStatus(`Niet gelukt: ${error.message}`);
      void load();
      return;
    }
    void revalidate('team');
  }

  // Zelfde afspraak als bij de kaart: volgorde is structuur, dus ze slaat
  // meteen op en hangt niet in de bewaarknop.
  async function move(person: TeamMember, direction: -1 | 1) {
    const index = people.findIndex((p) => p.id === person.id);
    const neighbour = people[index + direction];
    if (!neighbour) return;

    const [a, b] = [person.position, neighbour.position];
    const [next, other] = a === b ? [b + direction * 5, b] : [b, a];

    setPeople((prev) =>
      [...prev]
        .map((p) =>
          p.id === person.id
            ? { ...p, position: next }
            : p.id === neighbour.id
              ? { ...p, position: other }
              : p,
        )
        .sort((x, y) => x.position - y.position),
    );

    const results = await Promise.all([
      db.from('team_members').update({ position: next }).eq('id', person.id),
      db.from('team_members').update({ position: other }).eq('id', neighbour.id),
    ]);
    const failed = results.find((r) => r.error);
    if (failed?.error) {
      setStatus(`Volgorde niet bewaard: ${failed.error.message}`);
      void load();
      return;
    }
    void revalidate('team');
  }

  if (loading) return <p className="text-sm text-ink-faint">Even geduld.</p>;

  const field = 'min-h-11 w-full border border-rule bg-paper px-2 text-sm';
  const area = 'w-full border border-rule bg-paper p-2 text-sm leading-relaxed';

  return (
    <div className="flex flex-col gap-12">
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-4 border-b border-rule bg-paper py-3">
        <h1 className="text-2xl">Het team</h1>
        <button
          type="button"
          onClick={save}
          disabled={pending === 0}
          className="min-h-11 bg-brass px-5 text-sm font-semibold uppercase tracking-wide text-paper disabled:opacity-40"
        >
          Bewaren{pending > 0 ? ` (${pending})` : ''}
        </button>
        {status && (
          <p role="status" className="text-sm text-ink-soft">
            {status}
          </p>
        )}
      </div>

      <p className="max-w-prose text-sm text-ink-soft">
        Een leeg veld voor Engels of Frans valt terug op het Nederlands, dus
        een nieuwe alinea verschijnt meteen in alle drie de talen en kan later
        vertaald worden.
      </p>

      {people.map((person, index) => (
        <article key={person.id} className="border-t border-rule pt-6">
          <div className="mb-4 flex flex-wrap items-end gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-wider text-ink-faint">Naam</span>
              <input
                value={person.name}
                onChange={(e) => edit(person.id, { name: e.target.value })}
                className={`${field} w-56 font-medium`}
              />
            </label>

            <span className="ml-auto flex flex-wrap items-center gap-x-4">
              <span className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => move(person, -1)}
                  disabled={index === 0}
                  aria-label={`${person.name} naar boven`}
                  className="flex size-11 items-center justify-center border border-rule text-sm disabled:opacity-30"
                >
                  &uarr;
                </button>
                <button
                  type="button"
                  onClick={() => move(person, 1)}
                  disabled={index === people.length - 1}
                  aria-label={`${person.name} naar beneden`}
                  className="flex size-11 items-center justify-center border border-rule text-sm disabled:opacity-30"
                >
                  &darr;
                </button>
              </span>

              <button
                type="button"
                onClick={() => togglePublished(person)}
                aria-pressed={person.published}
                className={`min-h-11 px-3 text-xs uppercase tracking-wide ${
                  person.published ? 'border border-rule text-ink-soft' : 'bg-wine text-paper'
                }`}
              >
                {person.published ? 'Op de site' : 'Verborgen'}
              </button>
            </span>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {(['nl', 'en', 'fr'] as const).map((lang) => {
              const label = { nl: 'Nederlands', en: 'Engels', fr: 'Frans' }[lang];
              const roleKey = `role_${lang}` as const;
              const bioKey = `bio_${lang}` as const;
              const linkKey = `link_${lang}` as const;

              return (
                <div key={lang} className="flex flex-col gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brass">
                    {label}
                  </p>

                  <label className="flex flex-col gap-1">
                    <span className="text-xs text-ink-faint">Functie</span>
                    <input
                      value={person[roleKey] ?? ''}
                      placeholder={lang === 'nl' ? '' : person.role_nl}
                      onChange={(e) =>
                        edit(person.id, {
                          [roleKey]: e.target.value || (lang === 'nl' ? '' : null),
                        } as Partial<TeamMember>)
                      }
                      className={field}
                    />
                  </label>

                  <label className="flex flex-col gap-1">
                    <span className="text-xs text-ink-faint">
                      Bio, een lege regel tussen de alinea&apos;s
                    </span>
                    <textarea
                      value={person[bioKey] ?? ''}
                      placeholder={lang === 'nl' ? '' : 'Leeg = het Nederlands'}
                      rows={14}
                      onChange={(e) =>
                        edit(person.id, {
                          [bioKey]: e.target.value || (lang === 'nl' ? '' : null),
                        } as Partial<TeamMember>)
                      }
                      className={area}
                    />
                  </label>

                  <label className="flex flex-col gap-1">
                    <span className="text-xs text-ink-faint">Tekst van de link</span>
                    <input
                      value={person[linkKey] ?? ''}
                      onChange={(e) =>
                        edit(person.id, { [linkKey]: e.target.value || null } as Partial<TeamMember>)
                      }
                      className={field}
                    />
                  </label>
                </div>
              );
            })}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="text-xs text-ink-faint">Adres van de link</span>
              <input
                value={person.link_url ?? ''}
                placeholder="https://"
                onChange={(e) => edit(person.id, { link_url: e.target.value || null })}
                className={field}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs text-ink-faint">Foto</span>
              <input
                value={person.photo ?? ''}
                placeholder="/img/team/naam.webp"
                onChange={(e) => edit(person.id, { photo: e.target.value || null })}
                className={field}
              />
            </label>
          </div>
        </article>
      ))}
    </div>
  );
}
