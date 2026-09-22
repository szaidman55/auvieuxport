import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { alternates } from '@/lib/alternates';
import { site } from '@/lib/site';
import { getOpeningHours } from '@/lib/queries';
import { Hours } from '@/components/Hours';
import { ContactForm } from '@/components/ContactForm';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return { title: t('title'), description: t('intro'), alternates: alternates('/contact', locale) };
}

// De oude site had geen contactpagina. Wie /contact intikte kreeg een 404.
export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [hours, t, tb] = await Promise.all([
    getOpeningHours(),
    getTranslations('contact'),
    getTranslations('book'),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
      <h1 className="text-4xl sm:text-5xl">{t('title')}</h1>
      <p className="mt-4 max-w-prose text-lg text-ink-soft">{t('intro')}</p>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-10">
          <address className="not-italic leading-relaxed">
            <strong className="font-medium">{site.name}</strong>
            <br />
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

          <Hours hours={hours} />

          <div>
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass">
              {t('route')}
            </h2>
            <p className="max-w-prose text-sm text-ink-soft">{t('routeBody')}</p>
            <a
              href={site.maps}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex min-h-11 items-center text-sm underline underline-offset-4"
            >
              Google Maps
            </a>
          </div>

          <div>
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass">
              {tb('title')}
            </h2>
            {/* Stond al in drie talen klaar en werd nergens getoond: dit is
                de zin die uitlegt dat online en bellen allebei kunnen. */}
            {/* De uitleg blijft, de knop niet: "online" is de vaste balk
                onderaan, die hier altijd in beeld staat. */}
            <p className="max-w-prose text-sm text-ink-soft">
              {tb('intro', { phone: site.phoneDisplay })}
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
