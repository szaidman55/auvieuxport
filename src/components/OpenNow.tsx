'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { isOpenAt } from '@/lib/hours';
import type { OpeningHour } from '@/lib/types';

/**
 * Open of gesloten, nu.
 *
 * De vertalingen hiervoor stonden al in alle drie de talen in het
 * berichtenbestand maar werden nergens getoond: de uren stonden alleen als
 * tabel op de pagina, en wie "zijn ze nu open" wil weten moet dan zelf de dag
 * en de klok erbij halen.
 *
 * De server rendert hier niets. Een pagina wordt statisch gebouwd en een uur
 * lang hergebruikt, dus een antwoord uit de bouw zou op het moment van lezen
 * al fout kunnen zijn - en zou bovendien bij het hydrateren van de pagina
 * afwijken van wat de browser berekent.
 */
export function OpenNow({ hours }: { hours: OpeningHour[] }) {
  const t = useTranslations('hours');
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setOpen(isOpenAt(hours, new Date()));
    check();
    const timer = setInterval(check, 60_000);
    return () => clearInterval(timer);
  }, [hours]);

  if (open === null) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold ${
        open ? 'text-brass' : 'text-ink-faint'
      }`}
    >
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${open ? 'bg-brass' : 'bg-ink-faint'}`}
      />
      {open ? t('openNow') : t('closedNow')}
    </span>
  );
}
