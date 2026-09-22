import { supabasePublic } from '@/lib/supabase/server';
import type { MenuItem, MenuSection, OpeningHour, Wine, WineSection } from '@/lib/types';

export async function getMenu(): Promise<{ sections: MenuSection[]; items: MenuItem[] }> {
  const db = supabasePublic();

  const [sections, items] = await Promise.all([
    db.from('menu_sections').select('*').eq('published', true).order('position'),
    db.from('menu_items').select('*').order('position'),
  ]);

  return {
    sections: (sections.data ?? []) as MenuSection[],
    items: (items.data ?? []) as MenuItem[],
  };
}

export async function getWines(): Promise<{ sections: WineSection[]; wines: Wine[] }> {
  const db = supabasePublic();

  const [sections, wines] = await Promise.all([
    db.from('wine_sections').select('*').order('position'),
    db
      .from('wines')
      .select('*')
      .eq('available', true)
      .order('country')
      .order('region')
      .order('position'),
  ]);

  return {
    sections: (sections.data ?? []) as WineSection[],
    wines: (wines.data ?? []) as Wine[],
  };
}

export async function getOpeningHours(): Promise<OpeningHour[]> {
  const db = supabasePublic();
  const { data } = await db.from('opening_hours').select('*').order('weekday').order('opens');
  return (data ?? []) as OpeningHour[];
}

// De laatste keer dat de kelder bewoog. De oude site droeg deze datum met de
// hand; nu komt hij uit de gegevens zelf.
export async function getCellarUpdatedAt(): Promise<string | null> {
  const db = supabasePublic();
  const { data } = await db
    .from('wines')
    .select('updated_at')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  return (data as { updated_at: string } | null)?.updated_at ?? null;
}

export async function getBanner(locale: string) {
  const db = supabasePublic();
  const { data } = await db.from('site_settings').select('*').maybeSingle();
  if (!data) return null;

  const row = data as Record<string, string | null>;
  const text = row[`banner_${locale}`] ?? row.banner_nl;
  if (!text) return null;

  const until = row.banner_until;
  if (until && new Date(until) < new Date()) return null;

  return text;
}
