'use client';

import { useCallback, useEffect, useState } from 'react';
import { AuthGate } from '@/components/admin/AuthGate';
import { MIN_PASSWORD } from '@/lib/identity';

type Person = {
  user_id: string;
  name: string;
  role: 'floor' | 'manager';
  active: boolean;
  username: string;
};

const field = 'min-h-12 w-full border border-rule bg-paper px-3 text-base';

export default function PeoplePage() {
  return (
    <AuthGate>
      <People />
    </AuthGate>
  );
}

function People() {
  const [people, setPeople] = useState<Person[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [noKey, setNoKey] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch('/api/staff');
    if (res.status === 503) {
      setNoKey(true);
      return;
    }
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setStatus(body.error ?? 'Laden is niet gelukt.');
      return;
    }
    const body = (await res.json()) as { people: Person[] };
    setPeople(body.people);
    setNoKey(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function send(method: 'POST' | 'PATCH', payload: unknown) {
    setBusy(true);
    setStatus(null);
    const res = await fetch('/api/staff', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const body = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) {
      setStatus(body.error ?? 'Er ging iets mis.');
      return false;
    }
    await load();
    return true;
  }

  async function onAdd(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const ok = await send('POST', {
      name: data.get('name'),
      username: data.get('username'),
      password: data.get('password'),
      role: data.get('role'),
    });
    if (ok) {
      form.reset();
      setStatus('Toegevoegd.');
    }
  }

  async function onReset(person: Person) {
    const password = window.prompt(
      `Nieuw wachtwoord voor ${person.name} (minstens ${MIN_PASSWORD} tekens)`,
    );
    if (!password) return;
    const ok = await send('PATCH', { userId: person.user_id, password });
    if (ok) setStatus(`Wachtwoord van ${person.name} is gewijzigd.`);
  }

  if (noKey) {
    return (
      <>
        <h1 className="text-3xl">Mensen</h1>
        <div className="mt-6 max-w-prose border border-rule bg-paper-2 p-6">
          <p className="font-medium">Dit scherm heeft de service role key nodig.</p>
          <p className="mt-3 text-sm text-ink-soft">
            Accounts aanmaken kan alleen met die sleutel, en die hoort op de
            server te blijven. Zet hem in Vercel als{' '}
            <code className="bg-paper px-1">SUPABASE_SERVICE_ROLE_KEY</code>,
            type Secret, en deploy opnieuw. U vindt hem in Supabase onder
            Settings, API Keys, Secret keys.
          </p>
          <p className="mt-3 text-sm text-ink-soft">
            Tot dan kunt u mensen aanmaken in Supabase zelf, onder
            Authentication.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="text-3xl">Mensen</h1>
      </div>
      <p className="mt-3 max-w-prose text-ink-soft">
        Wie hier staat kan zich aanmelden met zijn voornaam. De vloer mag
        uitverkocht zetten en terugzetten; een manager mag de kaart, de kelder
        en de uren wijzigen.
      </p>

      <ul className="mt-8 flex flex-col">
        {people.map((p) => (
          <li
            key={p.user_id}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-rule py-4 first:border-0"
          >
            <span className="font-medium">{p.name}</span>
            <span className="text-sm text-ink-faint">{p.username}</span>
            <span className="rounded-sm bg-paper-2 px-2 py-0.5 text-xs uppercase tracking-wide text-brass">
              {p.role === 'manager' ? 'manager' : 'vloer'}
            </span>
            {!p.active && (
              <span className="rounded-sm bg-paper-2 px-2 py-0.5 text-xs uppercase tracking-wide text-wine">
                uit
              </span>
            )}

            <span className="ml-auto flex flex-wrap gap-3">
              <button
                type="button"
                disabled={busy}
                onClick={() => void onReset(p)}
                className="min-h-11 text-sm underline underline-offset-4"
              >
                Wachtwoord
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() =>
                  void send('PATCH', { userId: p.user_id, active: !p.active })
                }
                className="min-h-11 text-sm underline underline-offset-4"
              >
                {p.active ? 'Uitschakelen' : 'Inschakelen'}
              </button>
            </span>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-2xl">Iemand toevoegen</h2>
      <form onSubmit={onAdd} className="mt-6 grid max-w-2xl gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Naam</span>
          <input name="name" required className={field} placeholder="Tom Schoonbaert" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Aanmeldnaam</span>
          <input
            name="username"
            required
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            className={field}
            placeholder="tom"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">
            Wachtwoord (minstens {MIN_PASSWORD} tekens)
          </span>
          <input
            name="password"
            type="text"
            required
            minLength={MIN_PASSWORD}
            className={field}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Rol</span>
          <select name="role" defaultValue="floor" className={field}>
            <option value="floor">Vloer</option>
            <option value="manager">Manager</option>
          </select>
        </label>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={busy}
            className="min-h-12 bg-brass px-6 text-sm font-semibold uppercase tracking-wide text-paper disabled:opacity-60"
          >
            Toevoegen
          </button>
        </div>
      </form>

      {status && (
        <p role="status" className="mt-6 text-sm text-ink-soft">
          {status}
        </p>
      )}
    </>
  );
}
