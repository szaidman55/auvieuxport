'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

// De oude site had maar een enkele actie: nu reserveren. Wie vanavond niet
// boekt, liet niets achter. Dit is de lage drempel ernaast.
export function Newsletter() {
  const t = useTranslations('newsletter');
  const locale = useLocale();
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('sending');

    const form = new FormData(event.currentTarget);
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: form.get('email'), locale }),
    }).catch(() => null);

    setState(res?.ok ? 'done' : 'error');
  }

  if (state === 'done') {
    return <p className="text-sm text-brass">{t('success')}</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <label htmlFor="nl-email" className="text-sm font-medium">
        {t('email')}
      </label>
      <div className="flex flex-wrap gap-2">
        <input
          id="nl-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="naam@voorbeeld.be"
          className="min-h-12 flex-1 border border-rule bg-paper px-3 text-base"
        />
        <button
          type="submit"
          disabled={state === 'sending'}
          className="min-h-12 bg-brass px-6 text-sm font-semibold uppercase tracking-wide text-paper disabled:opacity-60"
        >
          {t('submit')}
        </button>
      </div>
      {state === 'error' && <p className="text-sm text-wine">{t('error')}</p>}
    </form>
  );
}
