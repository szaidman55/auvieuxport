import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { team } from '@/lib/site';
import { BookButton } from '@/components/BookButton';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'team' });
  return { title: t('title') };
}

export default async function TeamPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('team');

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
      <h1 className="text-4xl sm:text-5xl">{t('title')}</h1>

      <ul className="mt-12 flex flex-col">
        {team.map((person) => (
          <li key={person.name} className="border-t border-rule py-6 first:border-0">
            <p className="font-display text-2xl">{person.name}</p>
            <p className="mt-1 text-sm uppercase tracking-[0.18em] text-brass">
              {person.role[locale]}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <BookButton>{t('title')}</BookButton>
      </div>
    </div>
  );
}
