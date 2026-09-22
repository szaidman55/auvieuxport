'use client';

import type { MenuSection } from '@/lib/types';

// De kop van een sectie in het beheer: de drie titels, de volgorde, en of ze
// op de site staat.
//
// De titels lopen mee in dezelfde bewaarknop als de gerechten. Volgorde,
// publiceren en verwijderen niet: dat zijn structuurwijzigingen, en een
// halve structuur die in een dirty-lijst hangt is een structuur waarvan
// niemand weet hoe ze erbij staat. Die slaan meteen op.
export function SectionHeader({
  section,
  itemCount,
  first,
  last,
  onEdit,
  onMove,
  onTogglePublished,
  onRemove,
  onAddItem,
}: {
  section: MenuSection;
  itemCount: number;
  first: boolean;
  last: boolean;
  onEdit: (patch: Partial<MenuSection>) => void;
  onMove: (direction: -1 | 1) => void;
  onTogglePublished: () => void;
  onRemove: () => void;
  onAddItem: () => void;
}) {
  const field = 'min-h-11 border border-rule bg-paper px-2 text-sm';

  return (
    <div className="mb-3 border-b border-rule pb-3">
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wider text-ink-faint">Nederlands</span>
          <input
            value={section.title_nl}
            onChange={(e) => onEdit({ title_nl: e.target.value })}
            className={`${field} w-52 font-medium`}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wider text-ink-faint">Engels</span>
          <input
            value={section.title_en ?? ''}
            placeholder={section.title_nl}
            onChange={(e) => onEdit({ title_en: e.target.value || null })}
            className={`${field} w-44`}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wider text-ink-faint">Frans</span>
          <input
            value={section.title_fr ?? ''}
            placeholder={section.title_nl}
            onChange={(e) => onEdit({ title_fr: e.target.value || null })}
            className={`${field} w-44`}
          />
        </label>

        <span className="ml-auto flex flex-wrap items-center gap-x-4">
          <span className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onMove(-1)}
              disabled={first}
              aria-label={`${section.title_nl} naar boven`}
              className="flex size-11 items-center justify-center border border-rule text-sm disabled:opacity-30"
            >
              &uarr;
            </button>
            <button
              type="button"
              onClick={() => onMove(1)}
              disabled={last}
              aria-label={`${section.title_nl} naar beneden`}
              className="flex size-11 items-center justify-center border border-rule text-sm disabled:opacity-30"
            >
              &darr;
            </button>
          </span>

          <button
            type="button"
            onClick={onTogglePublished}
            aria-pressed={section.published}
            className={`min-h-11 px-3 text-xs uppercase tracking-wide ${
              section.published ? 'border border-rule text-ink-soft' : 'bg-wine text-paper'
            }`}
          >
            {section.published ? 'Op de site' : 'Verborgen'}
          </button>

          <button
            type="button"
            onClick={onAddItem}
            className="min-h-11 text-sm underline underline-offset-4"
          >
            Gerecht toevoegen
          </button>

          <button
            type="button"
            onClick={onRemove}
            className="min-h-11 text-sm text-wine underline underline-offset-4"
          >
            Sectie verwijderen
          </button>
        </span>
      </div>

      {!section.published && (
        <p className="mt-2 text-xs text-ink-faint">
          Deze sectie staat niet op de site. De gerechten blijven bewaard.
        </p>
      )}
      {section.published && itemCount === 0 && (
        <p className="mt-2 text-xs text-ink-faint">
          Nog geen gerechten, dus deze sectie verschijnt nog niet op de site.
        </p>
      )}
    </div>
  );
}
