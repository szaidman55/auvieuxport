import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { alternates } from '@/lib/alternates';
import { getMenu } from '@/lib/queries';
import { Link } from '@/i18n/navigation';
import { MenuList } from '@/components/MenuList';
import { BookButton } from '@/components/BookButton';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'menu' });
  return { title: t('title'), description: t('intro'), alternates: alternates('/kaart', locale) };
}

export default async function MenuPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [{ sections, items }, t, tn, tw] = await Promise.all([
    getMenu(),
    getTranslations('menu'),
    getTranslations('nav'),
    getTranslations('wine'),
  ]);

  const updated = items.reduce<string | null>(
    (latest, i) => (!latest || i.updated_at > latest ? i.updated_at : latest),
    null,
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
      <h1 className="text-4xl sm:text-5xl">{t('title')}</h1>
      <p className="mt-4 max-w-prose text-lg text-ink-soft">{t('intro')}</p>
      <p className="mt-2 max-w-prose text-sm text-ink-faint">{t('indication')}</p>

      <div className="mt-14">
        <MenuList sections={sections} items={items} locale={locale} />
      </div>

      <p className="mt-10 border-t border-rule pt-4 text-sm text-ink-faint">{t('friday')}</p>

      {updated && (
        <p className="mt-2 text-xs text-ink-faint">
          {t('updated', {
            date: new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(new Date(updated)),
          })}
        </p>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <BookButton>{tn('book')}</BookButton>
        <Link
          href="/wijnkaart"
          className="inline-flex min-h-11 items-center text-sm text-brass underline underline-offset-4 hover:text-ink"
        >
          {tw('link')}
        </Link>
      </div>
    </div>
  );
}
