'use client';

import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { locales, type Locale } from '@/i18n/routing';

const LABEL: Record<Locale, string> = { nl: 'NL', en: 'EN', fr: 'FR' };
const FULL: Record<Locale, string> = {
  nl: 'Nederlands',
  en: 'English',
  fr: 'Français',
};

// De oude site had drie vlaggetjes; deze site had niets. Drie letters, met de
// huidige taal als gewone tekst zodat er niets te klikken valt dat je al bent.
//
// usePathname geeft het pad zonder taalprefix en in de interne vorm, dus
// /wijnkaart blijft /wijnkaart ook als de bezoeker op /en/wine-list staat.
// next-intl vertaalt het adres weer bij het renderen van de link.
export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const pathname = usePathname();
  const params = useParams();
  const active = useLocale() as Locale;
  const t = useTranslations('nav');

  return (
    <nav aria-label={t('language')} className={`flex items-center gap-1 ${className}`}>
      {locales.map((l) =>
        l === active ? (
          <span
            key={l}
            aria-current="true"
            className="flex min-h-11 items-center px-2 text-sm font-semibold text-ink"
          >
            <span className="sr-only">{FULL[l]}, </span>
            {LABEL[l]}
          </span>
        ) : (
          <Link
            key={l}
            href={{ pathname, params } as never}
            locale={l}
            hrefLang={l}
            className="flex min-h-11 items-center px-2 text-sm text-ink-faint hover:text-ink"
          >
            <span className="sr-only">{FULL[l]}</span>
            <span aria-hidden="true">{LABEL[l]}</span>
          </Link>
        ),
      )}
    </nav>
  );
}
