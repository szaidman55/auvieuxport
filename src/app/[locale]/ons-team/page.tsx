import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { localised } from '@/lib/types';
import { getTeam } from '@/lib/queries';
import { BookButton } from '@/components/BookButton';
import { Link } from '@/i18n/navigation';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'team' });
  return { title: t('title'), description: t('intro') };
}

export default async function TeamPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  // De knop onderaan zei "Maak kennis met ons team", op de teampagina zelf.
  const [t, tb, people] = await Promise.all([
    getTranslations('team'),
    getTranslations('book'),
    getTeam(),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
      <header className="mx-auto max-w-2xl">
        <h1 className="text-4xl sm:text-5xl">{t('title')}</h1>
        <p className="mt-4 text-lg text-ink-soft">{t('intro')}</p>
      </header>

      <div className="mt-16 flex flex-col gap-20 sm:mt-24 sm:gap-28">
        {people.map((person, i) => {
          const bio = localised(person, 'bio', locale) ?? '';
          const linkLabel = localised(person, 'link', locale);

          return (
            <article
              key={person.id}
              className="grid gap-8 sm:grid-cols-5 sm:items-start sm:gap-12"
            >
              {person.photo && (
                <div
                  className={[
                    'sm:col-span-2',
                    // Om en om links en rechts, zodat de pagina niet als een
                    // lijst leest maar als drie portretten.
                    i % 2 === 1 ? 'sm:order-2' : '',
                  ].join(' ')}
                >
                  <Image
                    src={person.photo}
                    alt={person.name}
                    width={720}
                    height={900}
                    sizes="(max-width: 640px) 100vw, 40vw"
                    className="w-full bg-paper-2 object-cover"
                    priority={i === 0}
                  />
                </div>
              )}

              <div className="sm:col-span-3">
                <h2 className="font-display text-3xl">{person.name}</h2>
                <p className="mt-1 text-sm uppercase tracking-[0.18em] text-brass">
                  {localised(person, 'role', locale)}
                </p>

                <div className="mt-6 flex flex-col gap-4 text-ink-soft">
                  {bio
                    // Regeleindes kunnen als CRLF in de database staan, dus
                    // een lege regel is niet altijd twee keer \n op rij.
                    .split(/(?:\r?\n){2,}/)
                    .map((para) => para.trim())
                    .filter(Boolean)
                    .map((para, k) => (
                      <p key={k}>{para}</p>
                    ))}
                </div>

                {person.link_url && linkLabel && (
                  <a
                    href={person.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex min-h-11 items-center text-sm text-brass underline underline-offset-4 hover:text-ink"
                  >
                    {linkLabel}
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-20 flex flex-wrap items-center gap-4 border-t border-rule pt-10">
        <BookButton>{tb('title')}</BookButton>
        <Link
          href="/wijnkaart"
          className="inline-flex min-h-11 items-center text-sm text-brass underline underline-offset-4 hover:text-ink"
        >
          {t('wineLink')}
        </Link>
      </div>
    </div>
  );
}
