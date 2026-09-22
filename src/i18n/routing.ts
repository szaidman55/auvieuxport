import { defineRouting } from 'next-intl/routing';

export const locales = ['nl', 'en', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'nl',
  // Nederlands draait op de kale URL; en en fr krijgen een prefix. Dat houdt
  // de bestaande Nederlandse adressen intact.
  localePrefix: 'as-needed',
  // De site begint in het Nederlands, voor iedereen.
  //
  // next-intl kijkt standaard naar de Accept-Language van de browser en stuurt
  // een Engelse bezoeker door naar /en. Dit is een Antwerps huis: wie het
  // adres intypt hoort de Nederlandse site te zien, ook met een Engelstalige
  // telefoon. Wie liever Engels of Frans leest, kiest dat zelf in de kop.
  localeDetection: false,
  pathnames: {
    '/': '/',
    '/kaart': { nl: '/kaart', en: '/menu', fr: '/carte' },
    '/wijnkaart': { nl: '/wijnkaart', en: '/wine-list', fr: '/carte-des-vins' },
    '/over-ons': { nl: '/over-ons', en: '/about', fr: '/a-propos' },
    '/ons-team': { nl: '/ons-team', en: '/our-team', fr: '/notre-equipe' },
    // Een naam, geen woord: hetzelfde adres in alle drie de talen, zoals op
    // de oude site.
    '/fine-dining': '/fine-dining',
    '/contact': { nl: '/contact', en: '/contact', fr: '/contact' },
  },
});
