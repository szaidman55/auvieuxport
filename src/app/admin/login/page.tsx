'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const { error: authError } = await supabaseBrowser().auth.signInWithPassword({
      email: String(form.get('email') ?? ''),
      password: String(form.get('password') ?? ''),
    });

    if (authError) {
      setError('Aanmelden is niet gelukt. Controleer het adres en het wachtwoord.');
      setBusy(false);
      return;
    }

    router.replace('/admin');
  }

  const field = 'min-h-12 w-full border border-rule bg-paper px-3 text-base';

  return (
    <div className="mx-auto max-w-sm py-10">
      <h1 className="text-3xl">Beheer</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Meld u aan om de kaart en de kelder te beheren.
      </p>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium">
            E-mailadres
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="username"
            inputMode="email"
            className={field}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium">
            Wachtwoord
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className={field}
          />
        </div>

        <button
          type="submit"
          disabled={busy}
          className="min-h-12 bg-brass px-6 text-sm font-semibold uppercase tracking-wide text-paper disabled:opacity-60"
        >
          Aanmelden
        </button>

        {error && (
          <p role="alert" className="text-sm text-wine">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
