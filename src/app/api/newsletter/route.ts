import { NextResponse } from 'next/server';
import { supabasePublic } from '@/lib/supabase/server';

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const locale = ['nl', 'en', 'fr'].includes(body?.locale) ? body.locale : 'nl';

  if (!EMAIL.test(email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
  }

  const { error } = await supabasePublic()
    .from('newsletter_subscribers')
    .insert({ email, locale });

  // Een dubbele inschrijving is geen fout voor wie inschrijft.
  if (error && error.code !== '23505') {
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
