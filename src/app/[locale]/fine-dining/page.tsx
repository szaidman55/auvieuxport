import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { alternates } from '@/lib/alternates';

// De drie huizen onder "Fine Dining in Antwerp": Marcel, Au Vieux Port en
// Maritime. Tekst en foto's komen van /fine-dining op de oude site, in de
// eigen vertalingen van het huis.
//
// Au Vieux Port krijgt geen link naar zijn website: dat is deze site. De oude
// pagina wees er wel naar, dus klikte men van de pagina naar haar eigen
// startpagina.
//
// Geen reserveerknop onderaan: de vaste balk en de kop dragen die al.
export const revalidate = 3600;

const HOUSES = [
  { key: 'marcel', photo: '/img/fine-dining/marcel.webp', href: 'https://www.restaurantmarcel.be/' },
  { key: 'auVieuxPort', photo: '/img/fine-dining/au-vieux-port.webp', href: null },
  { key: 'maritime', photo: '/img/fine-dining/maritime.webp', href: 'https://www.restaurantmaritime.be/' },
] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'fineDining' });
  return {
    title: t('title'),
    description: t('lead'),
    alternates: alternates('/fine-dining', locale),
  };
}

export default async function FineDiningPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('fineDining');

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
      <header className="mx-auto max-w-2xl">
        <h1 className="text-4xl sm:text-5xl">{t('title')}</h1>
        <p className="mt-4 text-lg text-ink-soft">{t('lead')}</p>
      </header>

      <div className="mt-16 flex flex-col gap-20 sm:mt-24 sm:gap-28">
        {HOUSES.map((house, i) => {
          const name = t(`houses.${house.key}.name`);
          return (
            <article
              key={house.key}
              className="grid gap-8 sm:grid-cols-2 sm:items-center sm:gap-12"
            >
              {/* Om en om links en rechts, zoals op de teampagina. */}
              <Image
                src={house.photo}
                alt={name}
                width={1200}
                height={800}
                sizes="(max-width: 640px) 100vw, 50vw"
                // De eerste staat op een telefoon in het eerste scherm.
                priority={i === 0}
                className={`w-full bg-paper-2 object-cover ${i % 2 === 1 ? 'sm:order-2' : ''}`}
              />
              <div>
                <h2 className="text-3xl">{name}</h2>
                <p className="mt-4 text-ink-soft">{t(`houses.${house.key}.body`)}</p>
                {house.href && (
                  <a
                    href={house.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex min-h-11 items-center text-sm text-brass underline underline-offset-4 hover:text-ink"
                  >
                    {t('visit')}
                    <span className="sr-only">: {name}</span>
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
