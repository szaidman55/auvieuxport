import { defineRouting } from 'next-intl/routing';

export const locales = ['nl', 'en', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'nl',
  // Nederlands draait op de kale URL; en en fr krijgen een prefix. Dat houdt
  // de bestaande Nederlandse adressen intact.
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/wijnkaart': { nl: '/wijnkaart', en: '/wine-list', fr: '/carte-des-vins' },
    '/contact': { nl: '/contact', en: '/contact', fr: '/contact' },
    '/ons-team': { nl: '/ons-team', en: '/our-team', fr: '/notre-equipe' },
  },
});
