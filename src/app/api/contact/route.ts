import { NextResponse } from 'next/server';
import { supabasePublic } from '@/lib/supabase/server';

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const message = typeof body?.message === 'string' ? body.message.trim() : '';
  const locale = ['nl', 'en', 'fr'].includes(body?.locale) ? body.locale : 'nl';

  if (!name || !message || !EMAIL.test(email)) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: 'too_long' }, { status: 400 });
  }

  const { error } = await supabasePublic()
    .from('contact_messages')
    .insert({ name, email, message, locale });

  if (error) return NextResponse.json({ error: 'failed' }, { status: 500 });

  return NextResponse.json({ ok: true });
}
