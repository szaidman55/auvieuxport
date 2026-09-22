import type { Metadata } from 'next';
import { getPathname } from '@/i18n/navigation';
import { locales, routing, type Locale } from '@/i18n/routing';

type Path = keyof typeof routing.pathnames;

/**
 * De canonical en de hreflang-verwijzingen van een pagina.
 *
 * Stond eerst alleen in de layout, met de startpagina als canonical. Dat
 * betekende dat /kaart, /wijnkaart en /over-ons allemaal naar de startpagina
 * verwezen: voor Google zijn dat dan geen aparte pagina's maar duplicaten van
 * de homepage, en dan is de kaart niet vindbaar als kaart.
 *
 * Hier uit de routering afgeleid, met dezelfde functie die de links maakt, dus
 * een vertaald adres kan niet uit de pas lopen met wat er echt bestaat.
 */
export function alternates(path: Path, locale: Locale): Metadata['alternates'] {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l === 'nl' ? 'nl-BE' : l] = getPathname({ href: path, locale: l });
  }
  languages['x-default'] = getPathname({ href: path, locale: routing.defaultLocale });

  return { canonical: getPathname({ href: path, locale }), languages };
}
