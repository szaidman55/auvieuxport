'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { BookButton } from './BookButton';
import { CallButton } from './CallButton';
import { LanguageSwitcher } from './LanguageSwitcher';

// De oude kop bleef op elk formaat een uitgeschreven menu over vier regels,
// 138 van de 812 pixels op een telefoon, permanent meescrollend. Deze plooit
// samen onder 900px en blijft op 56px.
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
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex min-h-11 items-center" aria-label="Au Vieux Port">
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

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Hoofdnavigatie">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="flex min-h-11 items-center text-sm text-ink-soft hover:text-ink"
              aria-current={pathname === l.href ? 'page' : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher className="hidden md:flex" />
          <CallButton label={t('call')} className="hidden text-ink-soft hover:text-ink lg:inline-flex" />
          <BookButton className="hidden sm:inline-flex">{t('book')}</BookButton>

          <button
            type="button"
            id="nav-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="nav-drawer"
            className="flex size-12 items-center justify-center lg:hidden"
          >
            <span className="sr-only">{t('menu')}</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
            </svg>
          </button>
        </div>
      </div>

      <div id="nav-drawer" hidden={!open} className="border-t border-rule bg-paper lg:hidden">
        <nav className="mx-auto flex max-w-5xl flex-col px-4 py-2" aria-label="Hoofdnavigatie">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center border-b border-rule/60 text-base"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex items-center justify-between gap-4 py-2">
            <LanguageSwitcher />
            <CallButton label={t('call')} className="text-ink-soft md:hidden" />
          </div>
        </nav>
      </div>
    </header>
  );
}
