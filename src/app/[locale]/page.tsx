import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { alternates } from '@/lib/alternates';
import { site, voucherShopUrl } from '@/lib/site';
import { Awards } from '@/components/Awards';
import { Canard } from '@/components/Canard';
import { Gallery } from '@/components/Gallery';
import { getOpeningHours } from '@/lib/queries';
import { summarise } from '@/lib/hours';
import { Link } from '@/i18n/navigation';
import { BookButton } from '@/components/BookButton';
import { RestaurantJsonLd } from '@/components/JsonLd';

// De kaart en de uren komen uit Supabase, dus de pagina wordt statisch
// gebouwd en elk uur opnieuw opgehaald. Een prijswijziging in /admin staat
// binnen het uur op de site, zonder bouw.
export const revalidate = 3600;

// Alleen de canonical en de hreflang; titel en omschrijving komen uit de
// layout. Zonder dit verwees elke pagina naar de startpagina als origineel.
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return { alternates: alternates('/', locale) };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [hours, t, tb, tm, tv, tn, th] = await Promise.all([
    getOpeningHours(),
    getTranslations('hero'),
    getTranslations('book'),
    getTranslations('menu'),
    getTranslations('voucher'),
    getTranslations('nav'),
    getTranslations('hours'),
  ]);

  const summary = summarise(hours);

  return (
    <>
      <RestaurantJsonLd hours={hours} locale={locale} />

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
            <BookButton>{tn('book')}</BookButton>
            <Link
              href="/kaart"
              className="inline-flex min-h-12 items-center justify-center border border-rule px-6 text-sm font-semibold uppercase tracking-wide hover:border-ink"
            >
              {t('menuCta')}
            </Link>
          </div>

          {/* Adres, uren en nummer in tekst, meteen. Niets mag hier
              afbreken: "03" op de ene regel en "290 77 11" op de volgende
              leest als twee getallen, en "ma - vr" zonder de uren erachter
              zegt niets. De uren stonden hier als vaste Nederlandse tekst,
              ook op de Franse pagina; nu komen ze uit dezelfde databank als
              de tabel in de voet. */}
          <p className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-soft">
            <span>{site.street}, {site.postalCode} {site.city}</span>
            {summary && (
              <>
                <span aria-hidden="true" className="text-rule">|</span>
                <span className="whitespace-nowrap">
                  {th(`short.${summary.from}`)} - {th(`short.${summary.to}`)}
                </span>
                {summary.times.map((slot) => (
                  <span key={slot} className="whitespace-nowrap">
                    {slot}
                  </span>
                ))}
              </>
            )}
            <span aria-hidden="true" className="text-rule">|</span>
            <a
              href={`tel:${site.phone}`}
              className="whitespace-nowrap underline underline-offset-4"
            >
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

      {/* De kaart staat op haar eigen pagina. Ze is lang genoeg om er een te
          verdienen, ze is deelbaar als adres, en ze duwde alles wat erna komt
          een scherm of vier naar beneden. Hier blijft de aankondiging. */}
      <section aria-labelledby="kaart-title" className="border-b border-rule">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
          <h2 id="kaart-title" className="text-3xl sm:text-4xl">
            {tm('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-prose text-ink-soft">{tm('teaser')}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/kaart"
              className="inline-flex min-h-12 items-center border border-ink px-6 text-sm font-semibold uppercase tracking-wide hover:bg-ink hover:text-paper"
            >
              {tm('seeAll')}
            </Link>
            <Link
              href="/wijnkaart"
              className="inline-flex min-h-12 items-center border border-rule px-6 text-sm font-semibold uppercase tracking-wide hover:border-ink"
            >
              {tn('wine')}
            </Link>
          </div>
        </div>
      </section>

      <Canard />

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
            <BookButton>{tn('book')}</BookButton>
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

