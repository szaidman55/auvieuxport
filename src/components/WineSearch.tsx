'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

// Vijfhonderd referenties zijn te veel om door te scrollen als je een
// producent zoekt. Dit filtert wat de server al heeft gerenderd: de wijnen
// worden niet nog een keer naar de browser gestuurd, en zonder JavaScript
// staat de hele kaart er gewoon.
export function WineSearch({ total }: { total: number }) {
  const t = useTranslations('wine');
  const [term, setTerm] = useState('');
  const [shown, setShown] = useState(total);
  const liveRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const needle = term.trim().toLowerCase();
    const items = document.querySelectorAll<HTMLElement>('[data-wine]');
    let visible = 0;

    items.forEach((el) => {
      const hit = needle === '' || (el.dataset.wine ?? '').includes(needle);
      el.hidden = !hit;
      if (hit) visible += 1;
    });

    // Een streek of een kleur zonder treffers hoort ook weg te vallen.
    document.querySelectorAll<HTMLElement>('[data-group]').forEach((g) => {
      g.hidden = !g.querySelector('[data-wine]:not([hidden])');
    });
    document.querySelectorAll<HTMLElement>('[data-section]').forEach((s) => {
      s.hidden = !s.querySelector('[data-wine]:not([hidden])');
    });

    setShown(visible);
  }, [term]);

  return (
    <div className="mt-8 border-y border-rule py-4">
      <label htmlFor="wine-search" className="block text-sm text-ink-soft">
        {t('searchLabel')}
      </label>
      <input
        id="wine-search"
        type="search"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder={t('searchPlaceholder')}
        autoComplete="off"
        className="mt-2 h-12 w-full border border-rule bg-paper px-3 text-base outline-none focus:border-ink"
      />
      <p ref={liveRef} aria-live="polite" className="mt-2 text-sm text-ink-faint">
        {term.trim() === ''
          ? t('count', { count: total })
          : t('found', { count: shown })}
      </p>
    </div>
  );
}
