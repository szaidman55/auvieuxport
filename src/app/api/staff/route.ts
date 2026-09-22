import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabaseServer } from '@/lib/supabase/server';
import { displayIdentity, passwordError, resolveIdentity } from '@/lib/identity';

export const dynamic = 'force-dynamic';

// Accounts aanmaken kan alleen met de service role key. Die blijft hier, op de
// server: hij staat nooit in een NEXT_PUBLIC_ variabele en gaat nooit naar de
// browser. Zonder die sleutel doet deze route niets en zegt ze dat ook.
function admin() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key || key.startsWith('eyJhbGciOi...')) return null;
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// Wie dit aanroept moet zelf manager zijn. De controle gebeurt tegen de
// database met de sessie van de beller, niet tegen iets wat de browser stuurt.
async function callerIsManager() {
  const db = await supabaseServer();
  const { data: auth } = await db.auth.getUser();
  if (!auth.user) return { ok: false as const, status: 401, why: 'Niet aangemeld.' };

  const { data: row } = await db
    .from('staff')
    .select('role, active')
    .eq('user_id', auth.user.id)
    .maybeSingle();

  if (!row || !row.active || row.role !== 'manager') {
    return { ok: false as const, status: 403, why: 'Alleen een manager kan dit.' };
  }
  return { ok: true as const, userId: auth.user.id };
}

export async function GET() {
  const caller = await callerIsManager();
  if (!caller.ok) return NextResponse.json({ error: caller.why }, { status: caller.status });

  const sb = admin();
  if (!sb) return NextResponse.json({ error: 'missing-service-key' }, { status: 503 });

  const db = await supabaseServer();
  const { data: staff } = await db.from('staff').select('*').order('name');

  const { data: users } = await sb.auth.admin.listUsers({ perPage: 200 });
  const byId = new Map(users.users.map((u) => [u.id, u.email ?? '']));

  return NextResponse.json({
    people: (staff ?? []).map((s) => ({
      user_id: s.user_id,
      name: s.name,
      role: s.role,
      active: s.active,
      username: displayIdentity(byId.get(s.user_id) ?? ''),
    })),
  });
}

export async function POST(request: Request) {
  const caller = await callerIsManager();
  if (!caller.ok) return NextResponse.json({ error: caller.why }, { status: caller.status });

  const sb = admin();
  if (!sb) return NextResponse.json({ error: 'missing-service-key' }, { status: 503 });

  const body = (await request.json()) as {
    name?: string;
    username?: string;
    password?: string;
    role?: 'floor' | 'manager';
  };

  const name = (body.name ?? '').trim();
  if (!name) return NextResponse.json({ error: 'Vul een naam in.' }, { status: 400 });

  const identity = resolveIdentity(body.username ?? '');
  if (!identity.ok) return NextResponse.json({ error: identity.reason }, { status: 400 });

  const bad = passwordError(body.password ?? '');
  if (bad) return NextResponse.json({ error: bad }, { status: 400 });

  const role = body.role === 'manager' ? 'manager' : 'floor';

  const { data: created, error: createError } = await sb.auth.admin.createUser({
    email: identity.address,
    password: body.password,
    // Er is geen inbox om heen te bevestigen.
    email_confirm: true,
  });

  if (createError || !created.user) {
    const already = /already/i.test(createError?.message ?? '');
    return NextResponse.json(
      { error: already ? 'Die naam is al in gebruik.' : 'Aanmaken is niet gelukt.' },
      { status: 400 },
    );
  }

  const { error: rowError } = await sb
    .from('staff')
    .insert({ user_id: created.user.id, name, role, active: true });

  if (rowError) {
    // Geen account laten rondslingeren zonder rij in staff.
    await sb.auth.admin.deleteUser(created.user.id);
    return NextResponse.json({ error: 'Aanmaken is niet gelukt.' }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

export async function PATCH(request: Request) {
  const caller = await callerIsManager();
  if (!caller.ok) return NextResponse.json({ error: caller.why }, { status: caller.status });

  const sb = admin();
  if (!sb) return NextResponse.json({ error: 'missing-service-key' }, { status: 503 });

  const body = (await request.json()) as {
    userId?: string;
    password?: string;
    active?: boolean;
    role?: 'floor' | 'manager';
  };

  if (!body.userId) return NextResponse.json({ error: 'Onbekende persoon.' }, { status: 400 });

  // Een manager mag zichzelf niet buitensluiten of degraderen: dan staat er
  // mogelijk niemand meer die iemand anders kan terugzetten.
  if (body.userId === caller.userId && (body.active === false || body.role === 'floor')) {
    return NextResponse.json({ error: 'U kunt uzelf niet uitschakelen.' }, { status: 400 });
  }

  if (body.password !== undefined) {
    const bad = passwordError(body.password);
    if (bad) return NextResponse.json({ error: bad }, { status: 400 });
    const { error } = await sb.auth.admin.updateUserById(body.userId, {
      password: body.password,
    });
    if (error) return NextResponse.json({ error: 'Wijzigen is niet gelukt.' }, { status: 400 });
  }

  const patch: Record<string, unknown> = {};
  if (body.active !== undefined) patch.active = body.active;
  if (body.role !== undefined) patch.role = body.role;

  if (Object.keys(patch).length > 0) {
    const { error } = await sb.from('staff').update(patch).eq('user_id', body.userId);
    if (error) return NextResponse.json({ error: 'Wijzigen is niet gelukt.' }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
