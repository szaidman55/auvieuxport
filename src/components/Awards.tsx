import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

// De oude site zette deze logo's als losse plaatjes zonder tekst. Hier staat
// onder elk logo wat het is, zodat het ook zonder beeld te lezen valt en een
// schermlezer er iets aan heeft.
//
// Elk logo staat in een vak van dezelfde hoogte. De logo's zelf verschillen
// in hoogte, en de lijst centreerde ze elk afzonderlijk: het onderschrift van
// Fine Dining stond daardoor een paar pixels hoger dan dat van Gault&Millau
// ernaast. Met een vast vak staan de onderschriften op één lijn, hoe groot
// het logo erin ook is.
//
// De links droegen alleen een plaatje met een lege alt, dus een schermlezer
// las ze als "link" zonder meer. Nu draagt elke link de naam van wat ze opent.
const GAULT_MILLAU = {
  src: '/img/brand/gault-millau-15.png',
  w: 943,
  h: 481,
  href: 'https://www.gaultmillau.be/nl/restaurants/au-vieux-port-antwerpen',
  className: 'h-12 sm:h-14',
};

const FINE_DINING = {
  src: '/img/brand/fine-dining-antwerp.png',
  w: 478,
  h: 283,
  className: 'h-10 sm:h-12',
};

// Wine Spectator bekroonde de kaart vijf jaar op rij. Het laatste jaar groot,
// de rest als jaartal ernaast: vijf identieke medailles zijn geen informatie.
//
// De link wees naar de zoekpagina van alle bekroonde restaurants ter wereld,
// waar het huis niet eens bovenaan staat. Nu naar de eigen fiche, gevonden via
// hun eigen artikel over het huis en nagekeken op adres en chef.
const WINE_SPECTATOR = {
  src: '/img/brand/wine-spectator-2026.jpg',
  w: 217,
  h: 400,
  href: 'https://www.winespectator.com/restaurants/6422/au-vieux-port',
  first: 2022,
  latest: 2026,
};

const slot = 'flex h-20 items-center justify-center';
// Een onderschrift breekt niet af. Op een telefoon is een kolom 171 pixels
// breed en "FINE DINING IN ANTWERP" liep daar met de brede letterafstand over
// twee regels; daar is de afstand kleiner, vanaf sm weer ruim.
const caption =
  'whitespace-nowrap text-[11px] uppercase tracking-[0.06em] text-ink-soft sm:text-xs sm:tracking-[0.14em]';

export async function Awards() {
  const t = await getTranslations('awards');
  const wineSpectator = `${t('wineSpectator')} ${WINE_SPECTATOR.first} - ${WINE_SPECTATOR.latest}`;

  return (
    <section aria-labelledby="awards" className="border-b border-rule bg-paper-2">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <h2 id="awards" className="sr-only">
          {t('title')}
        </h2>

        {/* Twee kolommen op een telefoon, drie daarboven. Gault&Millau en
            Fine Dining delen de eerste rij; Wine Spectator neemt op een
            telefoon de rij eronder over de volle breedte.

            Onder 360 pixels een per rij: op 320 is een kolom 136 pixels en
            het onderschrift van Fine Dining 152. Liever onder elkaar dan
            tegen elkaar. */}
        <ul className="grid grid-cols-1 items-start gap-x-4 gap-y-10 min-[360px]:grid-cols-2 sm:grid-cols-3 sm:gap-x-6">
          <li className="flex flex-col items-center gap-2 text-center">
            <a
              href={GAULT_MILLAU.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('gaultMillau')}
              className={slot}
            >
              <Image
                src={GAULT_MILLAU.src}
                alt=""
                width={GAULT_MILLAU.w}
                height={GAULT_MILLAU.h}
                className={`${GAULT_MILLAU.className} w-auto`}
              />
            </a>
            <span className={caption}>{t('gaultMillau')}</span>
          </li>

          <li className="flex flex-col items-center gap-2 text-center">
            <Link href="/fine-dining" aria-label={t('fineDining')} className={slot}>
              <Image
                src={FINE_DINING.src}
                alt=""
                width={FINE_DINING.w}
                height={FINE_DINING.h}
                className={`${FINE_DINING.className} w-auto`}
              />
            </Link>
            <span className={caption}>{t('fineDining')}</span>
          </li>

          <li className="flex flex-col items-center gap-2 text-center min-[360px]:col-span-2 sm:col-span-1">
            <a
              href={WINE_SPECTATOR.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={wineSpectator}
              className={slot}
            >
              <Image
                src={WINE_SPECTATOR.src}
                alt=""
                width={WINE_SPECTATOR.w}
                height={WINE_SPECTATOR.h}
                className="h-16 w-auto sm:h-20"
              />
            </a>
            <span className={caption}>{wineSpectator}</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
