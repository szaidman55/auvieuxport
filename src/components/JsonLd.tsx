import { site } from '@/lib/site';
import type { OpeningHour } from '@/lib/types';

const ISO_DAYS = [
  '', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
];

// De oude site voerde Google een logo als restaurantfoto, een menu-URL die
// naar de homepagina wees, priceRange in dollartekens, en twee Organization
// blokken die elkaar tegenspraken. Dit is een enkel, kloppend blok.
export function RestaurantJsonLd({
  hours,
  image,
}: {
  hours: OpeningHour[];
  image?: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${site.url}/#restaurant`,
    name: site.name,
    url: site.url,
    image: image ? [image] : undefined,
    telephone: site.phone,
    email: site.email,
    priceRange: '€€€€',
    currenciesAccepted: 'EUR',
    servesCuisine: ['French'],
    acceptsReservations: 'True',
    foundingDate: String(site.founded),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.street,
      postalCode: site.postalCode,
      addressLocality: site.city,
      addressCountry: site.country,
    },
    hasMenu: `${site.url}/#kaart`,
    openingHoursSpecification: hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ISO_DAYS[h.weekday],
      opens: h.opens.slice(0, 5),
      closes: h.closes.slice(0, 5),
    })),
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://bookings.zenchef.com/results?rid=380678`,
        inLanguage: 'nl-BE',
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
      result: { '@type': 'FoodEstablishmentReservation', name: 'Reservatie' },
    },
    sameAs: [site.social.facebook, site.social.tripadvisor],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
