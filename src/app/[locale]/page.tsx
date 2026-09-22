import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { site, voucherShopUrl } from '@/lib/site';
import { Awards } from '@/components/Awards';
import { Gallery } from '@/components/Gallery';
import { getMenu, getOpeningHours } from '@/lib/queries';
import { Link } from '@/i18n/navigation';
import { MenuList } from '@/components/MenuList';
import { BookButton } from '@/components/BookButton';
import { CallButton } from '@/components/CallButton';
import { RestaurantJsonLd } from '@/components/JsonLd';

// De kaart en de uren komen uit Supabase, dus de pagina wordt statisch
// gebouwd en elk uur opnieuw opgehaald. Een prijswijziging in /admin staat
// binnen het uur op de site, zonder bouw.
export const revalidate = 3600;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [{ sections, items }, hours, t, tb, tm, tv] = await Promise.all([
    getMenu(),
    getOpeningHours(),
    getTranslations('hero'),
    getTranslations('book'),
    getTranslations('menu'),
    getTranslations('voucher'),
  ]);

  const updated = items.reduce<string | null>(
    (latest, i) => (!latest || i.updated_at > latest ? i.updated_at : latest),
    null,
  );

  return (
    <>
      <RestaurantJsonLd hours={hours} />

      {/* De hele belofte staat in het eerste scherm: wie, waar, wanneer,
          en een knop. De oude site had hier alleen een foto. */}
      <section className="border-b border-rule">
        {/* De zaal, meteen. De belofte blijft tekst: de foto staat ernaast,
            niet eronder, zodat de reserveerknop op een telefoon nog altijd
            binnen het eerste scherm valt. */}
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:py-20 lg:grid-cols-[1fr_minmax(0,34rem)] lg:items-center lg:gap-16">
          <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brass">
            {site.city} &middot; {site.founded}
          </p>
          <h1 className="max-w-3xl text-4xl leading-tight sm:text-6xl">{t('tagline')}</h1>
          <p className="mt-5 max-w-xl text-lg text-ink-soft">{t('intro')}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <BookButton>{tb('title')}</BookButton>
            <a
              href="#kaart"
              className="inline-flex min-h-12 items-center justify-center border border-rule px-6 text-sm font-semibold uppercase tracking-wide hover:border-ink"
            >
              {t('menuCta')}
            </a>
            <CallButton label="Bel" className="text-ink-soft hover:text-ink" />
          </div>

          {/* Adres, uren en nummer in tekst, meteen. */}
          <p className="mt-8 text-sm text-ink-soft">
            {site.street}, {site.postalCode} {site.city}
            <span className="mx-2 text-rule">|</span>
            ma - vr 12:00 - 14:00 &amp; 18:00 - 21:30
            <span className="mx-2 text-rule">|</span>
            <a href={`tel:${site.phone}`} className="underline underline-offset-4">
              {site.phoneDisplay}
            </a>
          </p>
          </div>

          <Image
            src="/img/photos/avp-15.webp"
            alt={
              locale === 'fr'
                ? 'La salle du restaurant, dressée pour le service'
                : locale === 'en'
                  ? 'The dining room, set for service'
                  : 'De zaal, gedekt voor de dienst'
            }
            width={1600}
            height={1066}
            sizes="(max-width: 1024px) 100vw, 34rem"
            priority
            className="w-full bg-paper-2 object-cover lg:aspect-[4/3]"
          />
        </div>
      </section>

      {/* De onderscheidingen staan vóór de reserveerknop, niet erna. */}
      <Awards />

      <section id="kaart" aria-labelledby="kaart-title" className="scroll-mt-20">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
          <h2 id="kaart-title" className="text-center text-3xl sm:text-4xl">
            {tm('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-prose text-center text-ink-soft">
            {tm('intro')}
          </p>
          <p className="mx-auto mt-2 max-w-prose text-center text-sm text-ink-faint">
            {tm('indication')}
          </p>

          <div className="mt-12">
            <MenuList sections={sections} items={items} locale={locale} />
          </div>

          {updated && (
            <p className="mt-10 border-t border-rule pt-4 text-center text-xs text-ink-faint">
              {tm('updated', {
                date: new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(
                  new Date(updated),
                ),
              })}
            </p>
          )}

          <div className="mt-10 flex justify-center">
            <Link
              href="/wijnkaart"
              className="inline-flex min-h-12 items-center border border-rule px-6 text-sm font-semibold uppercase tracking-wide hover:border-ink"
            >
              {useWineLabel(locale)}
            </Link>
          </div>
        </div>
      </section>

      <Gallery locale={locale} />

      <section aria-labelledby="book-title" className="border-y border-rule bg-ink text-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
          <h2 id="book-title" className="text-3xl text-paper sm:text-4xl">
            {tb('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-prose text-[#d9d0cd]">{tb('note')}</p>
          <p className="mx-auto mt-2 max-w-prose text-sm text-[#b3a7a3]">{tb('groups')}</p>
          <p className="mx-auto mt-2 max-w-prose text-sm text-[#b3a7a3]">{tb('canard')}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <BookButton>{tb('title')}</BookButton>
            <a
              href={`tel:${site.phone}`}
              className="inline-flex min-h-12 items-center border border-[#3a302d] px-6 text-sm font-semibold text-paper"
            >
              {site.phoneDisplay}
            </a>
          </div>
          <p className="mt-5 text-xs text-[#b3a7a3]">{tb('cancel')}</p>
        </div>
      </section>

      <section aria-labelledby="voucher-title">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h2 id="voucher-title" className="text-3xl">{tv('title')}</h2>
          <p className="mx-auto mt-4 max-w-prose text-ink-soft">{tv('intro')}</p>
          <a
            href={voucherShopUrl(locale)}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-12 items-center bg-brass px-8 text-sm font-semibold uppercase tracking-wide text-paper hover:bg-ink"
          >
            {tv('cta')}
          </a>
        </div>
      </section>
    </>
  );
}

function useWineLabel(locale: Locale): string {
  return locale === 'fr' ? 'Carte des vins' : locale === 'en' ? 'Wine list' : 'Wijnkaart';
}
