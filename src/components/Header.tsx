'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { BookButton } from './BookButton';
import { CallButton } from './CallButton';
import { LanguageSwitcher } from './LanguageSwitcher';

// De kop plooide niet samen maar kneep samen.
//
// BookButton en CallButton dragen 'inline-flex' in hun eigen basisklassen. Een
// 'hidden' die de kop erachteraan plakte verloor het daarvan: Tailwind zet
// .hidden vóór .inline-flex in het bestand, en bij gelijke specificiteit wint
// de laatste regel. Beide knoppen stonden dus op élke breedte in de kop, ook
// naast de hamburger op een telefoon van 390 pixels. Er was geen plaats, dus
// brak alles af: "Carte des" / "vins", "03 290" / "77 11", en een nummer dat
// over twee regels als twee getallen leest.
//
// Nu hangt het verbergen aan een omhullende div zonder eigen display-klasse,
// zoals bij de <nav> hieronder, waar het altijd wel werkte. Daarbovenop mag
// niets in de kop nog afbreken, en vouwt ze een maat vroeger samen: het Frans
// is breder dan het Nederlands en liep op 1024 niet rond.
export function Header({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: '/kaart' as const, label: t('menu') },
    { href: '/wijnkaart' as const, label: t('wine') },
    { href: '/over-ons' as const, label: t('about') },
    { href: '/ons-team' as const, label: t('team') },
    { href: '/contact' as const, label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 px-4">
        <Link href="/" className="flex min-h-11 shrink-0 items-center" aria-label="Au Vieux Port">
          {/* Het eigen woordmerk van het huis, een kalligrafisch schrift. Niet
              nagetekend: een benadering in SVG zou een ander logo zijn. */}
          <Image
            src="/img/brand/logo.png"
            alt="Au Vieux Port"
            width={650}
            height={184}
            priority
            className="h-7 w-auto sm:h-8"
          />
        </Link>

        <nav className="hidden items-center gap-6 xl:flex" aria-label={t('primary')}>
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="flex min-h-11 items-center whitespace-nowrap text-sm text-ink-soft hover:text-ink"
              aria-current={pathname === l.href ? 'page' : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Bellen en reserveren horen bij elkaar en verdwijnen samen. Op een
            telefoon staan ze al onderaan binnen duimbereik, dus hier niet
            nog eens. */}
        <div className="hidden items-center gap-2 xl:flex">
          <LanguageSwitcher />
          <CallButton label={t('call')} className="whitespace-nowrap text-ink-soft hover:text-ink" />
          <BookButton className="whitespace-nowrap">{t('book')}</BookButton>
        </div>

        <button
          type="button"
          id="nav-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="nav-drawer"
          className="-mr-3 flex size-12 items-center justify-center xl:hidden"
        >
          <span className="sr-only">{t('menu')}</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
          </svg>
        </button>
      </div>

      <div id="nav-drawer" hidden={!open} className="border-t border-rule bg-paper xl:hidden">
        <nav className="mx-auto flex max-w-6xl flex-col px-4 py-2" aria-label={t('primary')}>
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center border-b border-rule/60 text-base"
              aria-current={pathname === l.href ? 'page' : undefined}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex flex-wrap items-center justify-between gap-x-4 py-2">
            <LanguageSwitcher />
            <CallButton label={t('call')} className="whitespace-nowrap px-0 text-ink-soft" />
          </div>
        </nav>
      </div>
    </header>
  );
}
