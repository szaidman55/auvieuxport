import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { alternates } from '@/lib/alternates';
import { voucherShopUrl } from '@/lib/site';
import { Awards } from '@/components/Awards';
import { Canard } from '@/components/Canard';
import { Gallery } from '@/components/Gallery';
import { HeroVideo } from '@/components/HeroVideo';
import { getOpeningHours } from '@/lib/queries';
import { Link } from '@/i18n/navigation';
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

  const [hours, t, tb, tm, tv, tn] = await Promise.all([
    getOpeningHours(),
    getTranslations('hero'),
    getTranslations('book'),
    getTranslations('menu'),
    getTranslations('voucher'),
    getTranslations('nav'),
  ]);

  return (
    <>
      <RestaurantJsonLd hours={hours} locale={locale} />

      {/* De zaal in beweging, met de belofte eroverheen.

          Hier stonden achtereenvolgens een reserveerknop, een knop naar de
          kaart, het adres, de uren en het nummer. Elk daarvan staat al op een
          betere plaats: reserveren in de vaste balk onderaan en vanaf xl in de
          kop, de kaart in de afdeling direct hieronder, adres en uren in de
          voet en op de contactpagina.

          Wat overblijft is een zin en het huis zelf. Een foto van gedekte
          tafels is wat elk restaurant kan tonen; een zaal die vol zit niet.

          De tekst ligt op het beeld, dus er moet een sluier tussen, anders is
          wit op een lichte scene niet te lezen. De verloop loopt van links,
          waar de woorden staan, en van onderaan, waar de scene het lichtst is. */}
      <section className="relative isolate overflow-hidden border-b border-rule bg-ink">
        <HeroVideo className="absolute inset-0 -z-20 size-full object-cover" />

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/25"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-ink/80 to-transparent"
        />

        <div className="mx-auto flex min-h-[26rem] max-w-6xl items-end px-4 py-16 sm:min-h-[34rem] sm:py-24">
          <div>
            <h1 className="max-w-3xl text-4xl leading-tight text-paper sm:text-6xl">
              {t('tagline')}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-[#E4DBD8]">{t('intro')}</p>
          </div>
        </div>
      </section>

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

      {/* De onderscheidingen staan onder de specialiteit.
          Ze stonden vlak onder de kop, waar ze het eerste waren wat een gast
          te lezen kreeg - drie logo's voordat er iets verteld was over het
          huis. Een onderscheiding weegt pas als men weet waarvoor ze gegeven
          is: eerst de kaart en de canard, dan wie dat bekroond heeft. */}
      <Awards />

      <Gallery locale={locale} />

      {/* Wat u moet weten vóór u reserveert - niet nog een keer de knop.
          De startpagina had er drie: boven, hier, en de balk onderaan die op
          een telefoon toch altijd meescrollt. Drie knoppen voor één handeling
          maakt de handeling niet duidelijker. Deze afdeling houdt wat ze als
          enige te zeggen had: de twee gangen, de groepen, de canard en het
          annuleren. Reserveren doet u in de vaste balk onderaan, of vanaf xl
          in de kop. */}
      <section aria-labelledby="book-title" className="border-y border-rule bg-ink text-paper">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
          <h2 id="book-title" className="text-3xl text-paper sm:text-4xl">
            {tb('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-prose text-[#d9d0cd]">{tb('note')}</p>
          <p className="mx-auto mt-2 max-w-prose text-sm text-[#b3a7a3]">{tb('groups')}</p>
          <p className="mx-auto mt-2 max-w-prose text-sm text-[#b3a7a3]">{tb('canard')}</p>
          <p className="mx-auto mt-2 max-w-prose text-sm text-[#b3a7a3]">{tb('cancel')}</p>
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

