// De vaste gegevens van het huis.
//
// Deze stonden vroeger nergens op de site: geen uren, geen aanklikbaar
// telefoonnummer, geen adres in tekst. Ze staan hier eenmaal, en worden
// overal vandaan gelezen - ook door de structured data die Google leest.

export const site = {
  name: 'Au Vieux Port',
  founded: 2007,
  street: 'Napelsstraat 130',
  postalCode: '2000',
  city: 'Antwerpen',
  country: 'BE',
  // E.164, zodat tel: op iedere telefoon werkt.
  phone: '+3232907711',
  phoneDisplay: '03 290 77 11',
  email: 'reservatie@restaurantauvieuxport.be',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.restaurantauvieuxport.be',
  maps: 'https://maps.google.com/?q=Napelsstraat+130,+2000+Antwerpen',
  social: {
    facebook: 'https://www.facebook.com/AuVieuxPort',
    tripadvisor:
      'https://www.tripadvisor.be/Restaurant_Review-g188636-d3513420-Reviews-Au_Vieux_Port-Antwerp_Antwerp_Province.html',
    gaultmillau: 'https://www.gaultmillau.be/nl/restaurants/au-vieux-port-antwerpen',
  },
} as const;

// Zenchef doet de reservaties. Het id is dat van Au Vieux Port.
export const zenchef = {
  restaurantId: '380678',
  sdk: 'https://sdk.zenchef.com/v1/sdk.min.js',
  // De SDK opent het venster op een link naar deze anchor.
  openAnchor: '#zc-action-open',
  // De kleur die het bestaande huis aan Zenchef meegeeft.
  primaryColor: 'ad9964',
  shopId: 'sh_6a12d788-29a0-4bb9-8633-b86315b384ad',
} as const;

// De cadeaubonwinkel stond op language=nl voor iedereen, en op een primaire
// kleur van fcf8f8 - waardoor de koopknop wit op wit stond. Allebei gerepareerd.
export function voucherShopUrl(locale: string): string {
  const params = new URLSearchParams({
    'active-collection': 'vouchers',
    collections: 'vouchers',
    'shop-id': zenchef.shopId,
    language: locale,
    'primary-color': '8A6A33',
  });
  return `https://shop.zenchef.com/?${params.toString()}`;
}

export const awards = [
  { label: 'Best of Award of Excellence', issuer: 'Wine Spectator', years: '2023 - 2026' },
  { label: 'Award of Excellence', issuer: 'Wine Spectator', years: '2022' },
  { label: 'Star Wine List', issuer: 'Star Wine List', years: '2026' },
  { label: 'Vermeld in de gids', issuer: 'Gault&Millau', years: null },
  { label: 'Fine Dining in Antwerp', issuer: 'Fine Dining in Antwerp', years: null },
] as const;

export const team = [
  { name: 'Stijn Havermans', role: { nl: 'Chef', en: 'Chef', fr: 'Chef' } },
  { name: 'Tom Schoonbaert', role: { nl: 'Maitre', en: 'Maitre d', fr: "Maitre d'hotel" } },
  { name: 'Serge Verboven', role: { nl: 'Eigenaar en wine director', en: 'Owner and wine director', fr: 'Proprietaire et wine director' } },
] as const;
