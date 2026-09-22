import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

// De oude site zette deze logo's als losse plaatjes zonder tekst. Hier staat
// onder elk logo wat het is, zodat het ook zonder beeld te lezen valt en een
// schermlezer er iets aan heeft.
const MARKS = [
  {
    src: '/img/brand/gault-millau-15.png',
    w: 943,
    h: 481,
    key: 'gaultMillau' as const,
    href: 'https://www.gaultmillau.be/nl/restaurants/au-vieux-port-antwerpen',
    className: 'h-12 sm:h-14',
  },
  {
    src: '/img/brand/fine-dining-antwerp.png',
    w: 478,
    h: 283,
    key: 'fineDining' as const,
    href: null,
    className: 'h-10 sm:h-12',
  },
];

// Wine Spectator bekroonde de kaart vijf jaar op rij. Het laatste jaar groot,
// de rest als jaartal ernaast: vijf identieke medailles zijn geen informatie.
const WINE_SPECTATOR = {
  latest: { src: '/img/brand/wine-spectator-2026.jpg', year: 2026, w: 217, h: 400 },
  earlier: [2025, 2024, 2023, 2022],
};

export async function Awards() {
  const t = await getTranslations('awards');

  return (
    <section aria-labelledby="awards" className="border-b border-rule bg-paper-2">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <h2 id="awards" className="sr-only">
          {t('title')}
        </h2>

        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:justify-between">
          {MARKS.map((m) => {
            const label = t(m.key);
            const img = (
              <Image
                src={m.src}
                alt=""
                width={m.w}
                height={m.h}
                className={`${m.className} w-auto`}
              />
            );
            return (
              <li key={m.key} className="flex flex-col items-center gap-2 text-center">
                {m.href ? (
                  <a
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center"
                  >
                    {img}
                  </a>
                ) : (
                  img
                )}
                <span className="text-xs uppercase tracking-[0.14em] text-ink-soft">
                  {label}
                </span>
              </li>
            );
          })}

          <li className="flex flex-col items-center gap-2 text-center">
            <Image
              src={WINE_SPECTATOR.latest.src}
              alt=""
              width={WINE_SPECTATOR.latest.w}
              height={WINE_SPECTATOR.latest.h}
              className="h-16 w-auto sm:h-20"
            />
            <span className="text-xs uppercase tracking-[0.14em] text-ink-soft">
              {t('wineSpectator')} {WINE_SPECTATOR.earlier[WINE_SPECTATOR.earlier.length - 1]}
              {' - '}
              {WINE_SPECTATOR.latest.year}
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
