import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

// De oude sitemap verwees Google naar een pagina die 404 gaf, en liet de
// Engelse en Franse site volledig weg. Deze wordt uit de routering gegenereerd.
const paths = [
  { nl: '/', en: '/en', fr: '/fr', priority: 1 },
  { nl: '/wijnkaart', en: '/en/wine-list', fr: '/fr/carte-des-vins', priority: 0.9 },
  { nl: '/ons-team', en: '/en/our-team', fr: '/fr/notre-equipe', priority: 0.6 },
  { nl: '/contact', en: '/en/contact', fr: '/fr/contact', priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return paths.flatMap((p) =>
    (['nl', 'en', 'fr'] as const).map((locale) => ({
      url: `${site.url}${p[locale]}`,
      lastModified: now,
      priority: locale === 'nl' ? p.priority : p.priority - 0.1,
      alternates: {
        languages: {
          'nl-BE': `${site.url}${p.nl}`,
          en: `${site.url}${p.en}`,
          fr: `${site.url}${p.fr}`,
        },
      },
    })),
  );
}
