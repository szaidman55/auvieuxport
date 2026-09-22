import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { site } from '@/lib/site';
import { getBanner, getOpeningHours } from '@/lib/queries';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StickyBar } from '@/components/StickyBar';
import { ZenchefLoader } from '@/components/ZenchefLoader';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });

  const titles: Record<string, string> = {
    nl: 'Klassiek Frans restaurant op het Eilandje, Antwerpen',
    en: 'Classic French restaurant on the Eilandje, Antwerp',
    fr: "Restaurant français classique sur l'Eilandje, Anvers",
  };

  const descriptions: Record<string, string> = {
    nl: 'Klassiek Frans restaurant op het Eilandje in Antwerpen, sinds 2007. Canard à la Rouennaise aan tafel, bekroonde wijnkaart. Reserveer online.',
    en: "Classic French restaurant on Antwerp's Eilandje, since 2007. Canard à la Rouennaise carved at your table, award-winning wine list. Book online.",
    fr: "Restaurant français classique sur l'Eilandje à Anvers, depuis 2007. Canard à la Rouennaise en salle, carte des vins primée. Réservez en ligne.",
  };

  return {
    metadataBase: new URL(site.url),
    title: { default: `${titles[locale]} - ${site.name}`, template: `%s - ${site.name}` },
    description: descriptions[locale],
    openGraph: {
      type: 'website',
      siteName: site.name,
      title: titles[locale],
      description: descriptions[locale],
      locale,
    },
    other: { 'format-detection': 'telephone=yes' },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const [hours, banner] = await Promise.all([getOpeningHours(), getBanner(locale)]);
  const t = await getTranslations({ locale, namespace: 'nav' });

  return (
    <html lang={locale === 'nl' ? 'nl-BE' : locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500&family=Archivo:wght@400;500;600&display=swap"
        />
      </head>
      <body className="pb-14 sm:pb-0">
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
          >
            {t('skip')}
          </a>

          {banner && (
            <p className="bg-ink px-4 py-2 text-center text-sm text-paper">{banner}</p>
          )}

          <Header locale={locale} />
          <main id="main">{children}</main>
          <Footer hours={hours} />
          <StickyBar />
          <ZenchefLoader locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
