import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { alternates } from '@/lib/alternates';
import { Link } from '@/i18n/navigation';
import { Awards } from '@/components/Awards';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return { title: t('title'), description: t('lead'), alternates: alternates('/over-ons', locale) };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, tw] = await Promise.all([
    getTranslations('about'),
    getTranslations('wine'),
  ]);

  const alt =
    locale === 'fr'
      ? "L'Eilandje, l'ancien quartier des docks d'Anvers"
      : locale === 'en'
        ? "The Eilandje, Antwerp's old dock quarter"
        : 'Het Eilandje, de oude dokkenwijk van Antwerpen';

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 pt-16 sm:pt-24">
        <h1 className="text-4xl sm:text-5xl">{t('title')}</h1>
        <p className="mt-6 text-xl text-ink-soft">{t('lead')}</p>
      </div>

      {/* Het Eilandje zelf, want dat is het antwoord op "waar zit u". */}
      <div className="mx-auto mt-12 max-w-5xl px-4">
        <Image
          src="/img/photos/avp-29.webp"
          alt={alt}
          width={1600}
          height={563}
          sizes="(max-width: 1024px) 100vw, 64rem"
          priority
          className="w-full bg-paper-2 object-cover"
        />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
        <div className="flex flex-col gap-5 text-ink-soft">
          <p>{t('p1')}</p>
          <p>{t('p2')}</p>
          <p>{t('p3')}</p>
          <p>{t('p4')}</p>
        </div>

        <p className="mt-10 border-t border-rule pt-6 text-ink">{t('label')}</p>

        {/* Reserveren staat in de vaste balk en vanaf xl in de kop. */}
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href="/ons-team"
            className="inline-flex min-h-11 items-center text-sm text-brass underline underline-offset-4 hover:text-ink"
          >
            {t('teamLink')}
          </Link>
          <Link
            href="/wijnkaart"
            className="inline-flex min-h-11 items-center text-sm text-brass underline underline-offset-4 hover:text-ink"
          >
            {tw('link')}
          </Link>
        </div>
      </div>

      <Awards />
    </>
  );
}
