import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supabaseServer } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

/**
 * De site opnieuw laten bouwen voor wat er net gewijzigd is.
 *
 * De publieke pagina's staan voorgebouwd met revalidate = 3600. Dat is goed
 * voor een gast, die zo een kant-en-klare pagina krijgt, maar het betekende
 * dat een prijswijziging of een uitverkocht gerecht tot een uur kon blijven
 * hangen. Precies het moment waarop het ertoe doet, want uitverkocht is nieuws
 * van nu.
 *
 * Elk beheerscherm roept dit aan na een geslaagde wijziging. Het pad draagt
 * [locale], zodat Next alle drie de talen in een keer vernieuwt: los
 * opsommen zou betekenen dat een nieuwe taal of een hernoemd pad hier stil
 * vergeten wordt.
 */
const TARGETS = {
  // De kaart en de suggesties wonen in dezelfde tabellen en dus op dezelfde
  // pagina.
  menu: ['/[locale]/kaart'],
  wines: ['/[locale]/wijnkaart'],
  // De uren staan op de startpagina, in de contactgegevens en in de
  // structured data die Google leest.
  hours: ['/[locale]', '/[locale]/contact'],
  team: ['/[locale]/ons-team'],
} as const;

type Scope = keyof typeof TARGETS;

export async function POST(request: Request) {
  // Wie dit aanroept moet in de ploeg staan. Niet manager-only: de vloer zet
  // uitverkocht, en juist dat hoort meteen zichtbaar te zijn.
  const db = await supabaseServer();
  const { data: auth } = await db.auth.getUser();
  if (!auth.user) {
    return NextResponse.json({ error: 'Niet aangemeld.' }, { status: 401 });
  }

  const { data: staff } = await db
    .from('staff')
    .select('active')
    .eq('user_id', auth.user.id)
    .maybeSingle();

  if (!staff?.active) {
    return NextResponse.json({ error: 'Geen toegang.' }, { status: 403 });
  }

  const body = (await request.json().catch(() => ({}))) as { scope?: string };
  const scope = body.scope as Scope | undefined;

  if (!scope || !(scope in TARGETS)) {
    return NextResponse.json(
      { error: 'Onbekend onderdeel: ' + String(body.scope) },
      { status: 400 },
    );
  }

  for (const path of TARGETS[scope]) {
    revalidatePath(path, 'page');
  }

  return NextResponse.json({ ok: true, revalidated: TARGETS[scope] });
}
