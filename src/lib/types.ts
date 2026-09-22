import type { Locale } from '@/i18n/routing';

export type MenuSection = {
  id: string;
  title_nl: string; title_en: string | null; title_fr: string | null;
  note_nl: string | null; note_en: string | null; note_fr: string | null;
  position: number;
  published: boolean;
};

export type MenuItem = {
  id: string;
  section_id: string;
  name_nl: string; name_en: string | null; name_fr: string | null;
  note_nl: string | null; note_en: string | null; note_fr: string | null;
  price: number | null;
  // Getoond in plaats van een bedrag, voor wat per stuk gaat. Leeg bij een
  // lege prijs betekent nog altijd dagprijs.
  price_note_nl: string | null; price_note_en: string | null; price_note_fr: string | null;
  per_person: boolean;
  requires_preorder: boolean;
  seasonal: boolean;
  sold_out: boolean;
  allergens: string[];
  position: number;
  updated_at: string;
};

export type Wine = {
  id: string;
  colour: 'sparkling' | 'white' | 'red' | 'rose' | 'sweet';
  producer: string;
  name: string | null;
  country: string;
  region: string | null;
  appellation: string | null;
  grapes: string[];
  vintage: number | null;
  bottle_size: number;
  bottle: number;
  glass: number | null;
  tasting_note: string | null;
  sommelier_pick: boolean;
  available: boolean;
  position: number;
  updated_at: string;
};

export type WineSection = {
  id: Wine['colour'];
  title_nl: string; title_en: string | null; title_fr: string | null;
  position: number;
};

export type TeamMember = {
  id: string;
  slug: string;
  name: string;
  role_nl: string; role_en: string | null; role_fr: string | null;
  // Alinea's gescheiden door een lege regel.
  bio_nl: string; bio_en: string | null; bio_fr: string | null;
  photo: string | null;
  link_url: string | null;
  link_nl: string | null; link_en: string | null; link_fr: string | null;
  position: number;
  published: boolean;
};

export type OpeningHour = {
  weekday: number;
  service: 'lunch' | 'dinner';
  opens: string;
  closes: string;
};

// Engels en Frans vallen terug op het Nederlands zolang ze niet vertaald zijn,
// zodat een nieuw gerecht meteen op alle drie de talen verschijnt.
export function localised<T extends Record<string, unknown>>(
  row: T,
  field: string,
  locale: Locale,
): string | null {
  const value = row[`${field}_${locale}`];
  if (typeof value === 'string' && value.trim() !== '') return value;
  const fallback = row[`${field}_nl`];
  return typeof fallback === 'string' && fallback.trim() !== '' ? fallback : null;
}
