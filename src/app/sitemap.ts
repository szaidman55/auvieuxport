import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { getPathname } from '@/i18n/navigation';
import { locales, routing, type Locale } from '@/i18n/routing';

// De oude sitemap verwees Google naar een pagina die 404 gaf, en liet de
// Engelse en Franse site volledig weg.
//
// Daarna hield hij zijn eigen lijstje adressen bij, en dat liep meteen weer
// uit de pas met de routering: /en/wine-list stond erin terwijl dat pad niet
// bestond. Nu vraagt hij de adressen aan next-intl zelf, met dezelfde functie
// die de links op de site maakt. Een nieuwe pagina in routing.ts staat er
// vanzelf in, met het juiste vertaalde adres.
const PRIORITY: Record<string, number> = {
  '/': 1,
  '/kaart': 0.9,
  '/wijnkaart': 0.9,
  '/over-ons': 0.7,
  '/ons-team': 0.6,
  '/contact': 0.7,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = Object.keys(routing.pathnames) as (keyof typeof routing.pathnames)[];

  const url = (path: (typeof paths)[number], locale: Locale) =>
    `${site.url}${getPathname({ href: path, locale })}`;

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: url(path, locale),
      lastModified: now,
      priority: (PRIORITY[path] ?? 0.5) - (locale === routing.defaultLocale ? 0 : 0.1),
      alternates: {
        languages: {
          'nl-BE': url(path, 'nl'),
          en: url(path, 'en'),
          fr: url(path, 'fr'),
        },
      },
    })),
  );
}
