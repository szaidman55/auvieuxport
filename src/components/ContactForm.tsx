'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

// Het oude formulier had drie velden zonder label, zonder verplichting,
// zonder autocomplete, en het e-mailveld was type text - dus op een telefoon
// verscheen het gewone toetsenbord en ging een typfout ongemerkt door.
export function ContactForm() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('sending');

    const form = new FormData(event.currentTarget);
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: form.get('name'),
        email: form.get('email'),
        message: form.get('message'),
        locale,
      }),
    }).catch(() => null);

    setState(res?.ok ? 'done' : 'error');
  }

  if (state === 'done') {
    return <p className="text-sm text-brass">{t('success')}</p>;
  }

  const field = 'min-h-12 w-full border border-rule bg-paper px-3 py-2 text-base';

  return (
    <form onSubmit={onSubmit} className="flex max-w-md flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="c-name" className="text-sm font-medium">{t('name')}</label>
        <input id="c-name" name="name" type="text" required autoComplete="name" className={field} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="c-email" className="text-sm font-medium">{t('email')}</label>
        <input
          id="c-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          className={field}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="c-message" className="text-sm font-medium">{t('message')}</label>
        <textarea id="c-message" name="message" required rows={5} className={field} />
      </div>

      <button
        type="submit"
        disabled={state === 'sending'}
        className="min-h-12 self-start bg-brass px-8 text-sm font-semibold uppercase tracking-wide text-paper disabled:opacity-60"
      >
        {t('submit')}
      </button>

      {state === 'error' && <p className="text-sm text-wine">{t('error')}</p>}
    </form>
  );
}
