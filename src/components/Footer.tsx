import { getTranslations } from 'next-intl/server';
import { site } from '@/lib/site';
import { Hours } from './Hours';
import { Newsletter } from './Newsletter';
import type { OpeningHour } from '@/lib/types';

// De oude voet had geen adres, geen uren, geen aanklikbaar nummer, en gebruikte
// zijn kop om uit te leggen waar de reserveerknop stond.
export async function Footer({ hours }: { hours: OpeningHour[] }) {
  const t = await getTranslations('footer');
  const tn = await getTranslations('newsletter');
  const tv = await getTranslations('nav');
  const tc = await getTranslations('contact');

  return (
    <footer className="mt-24 border-t border-rule bg-paper-2">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brass">
            {site.name}
          </h3>
          <address className="not-italic text-sm leading-relaxed">
            {site.street}
            <br />
            {site.postalCode} {site.city}
            <br />
            <a href={`tel:${site.phone}`} className="underline underline-offset-4">
              {site.phoneDisplay}
            </a>
            <br />
            <a href={`mailto:${site.email}`} className="underline underline-offset-4">
              {site.email}
            </a>
          </address>
          <a
            href={site.maps}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex min-h-11 items-center text-sm underline underline-offset-4"
          >
            {tc('directions')}
          </a>
        </div>

        <Hours hours={hours} />

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brass">
            {tn('title')}
          </h3>
          <p className="mb-4 text-sm text-ink-soft">{tn('intro')}</p>
          <Newsletter />
        </div>
      </div>

      <div className="border-t border-rule">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-xs text-ink-faint">
          <span>{t('since')}</span>
          <nav className="flex gap-5" aria-label={tv('legal')}>
            <a href="/privacy" className="flex min-h-11 items-center underline underline-offset-4">
              {t('privacy')}
            </a>
            <a href="/cookies" className="flex min-h-11 items-center underline underline-offset-4">
              {t('cookies')}
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
