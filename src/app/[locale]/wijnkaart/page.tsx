import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { alternates } from '@/lib/alternates';
import { getWines, getCellarUpdatedAt } from '@/lib/queries';
import { localised, type Wine } from '@/lib/types';
import { geoHeading, geoName } from '@/lib/geo';
import { WineSearch } from '@/components/WineSearch';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'wine' });
  return { title: t('title'), description: t('intro'), alternates: alternates('/wijnkaart', locale) };
}

function bottleLabel(w: Wine, t: (k: string) => string): string | null {
  const size = Number(w.bottle_size);
  if (size === 1.5) return t('magnum');
  if (size === 0.375) return t('halfBottle');
  if (size !== 0.75) return `${size.toString().replace('.', ',')} l`;
  return null;
}

export default async function WinePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [{ sections, wines }, updated, t] = await Promise.all([
    getWines(),
    getCellarUpdatedAt(),
    getTranslations('wine'),
  ]);

  const money = new Intl.NumberFormat('nl-BE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
      <h1 className="text-4xl sm:text-5xl">{t('title')}</h1>
      <p className="mt-4 max-w-prose text-lg text-ink-soft">{t('intro')}</p>
      <WineSearch total={wines.length} />

      {/* Sprongnavigatie: de kaart is lang, en dit is hoe een sommelier ze leest. */}
      <nav
        aria-label={t('jumpTo')}
        className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-y border-rule py-4 text-sm"
      >
        <span className="text-ink-faint">{t('jumpTo')}</span>
        {sections.map((s) => {
          const count = wines.filter((w) => w.colour === s.id).length;
          if (count === 0) return null;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              data-jump={s.id}
              className="underline underline-offset-4"
            >
              {localised(s, 'title', locale)}{' '}
              <span data-jump-count className="tabular-nums text-ink-faint">
                {count}
              </span>
            </a>
          );
        })}
      </nav>

      <div className="mt-14 flex flex-col gap-16">
        {sections.map((section) => {
          const rows = wines.filter((w) => w.colour === section.id);
          if (rows.length === 0) return null;

          // Binnen een kleur groeperen op land, streek en appellatie, zoals de
          // kaart leest. Map bewaart de volgorde van invoegen, en die is de
          // volgorde van de kaart zelf.
          const groups = new Map<string, Wine[]>();
          // Land en streek in de taal van de bezoeker: de databank houdt ze
          // in het Engels, dus stond er "FRANCE · BURGUNDY" boven de
          // bourgognes, ook op de Franse en de Nederlandse kaart.
          rows.forEach((w) => {
            const key = geoHeading([w.country, w.region, w.appellation], locale);
            groups.set(key, [...(groups.get(key) ?? []), w]);
          });

          return (
            <section key={section.id} id={section.id} data-section className="scroll-mt-20">
              <h2 className="border-b border-rule pb-2 text-2xl">
                {localised(section, 'title', locale)}
              </h2>

              {[...groups.entries()].map(([group, list]) => (
                <div key={group} data-group className="mt-8">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brass">
                    {group}
                  </h3>
                  <ul className="flex flex-col">
                    {list.map((w) => {
                      const size = bottleLabel(w, t);
                      // Waar de zoekbalk op matcht. Server-side meegegeven,
                      // zodat de wijnen niet nog eens als JSON meereizen.
                      // Zowel de Engelse bron als de vertaalde naam, zodat
                      // "Bourgogne" en "Burgundy" allebei de bourgognes vinden.
                      const haystack = [
                        w.producer, w.name, w.country, w.region, w.appellation,
                        geoName(w.country, locale),
                        w.region && geoName(w.region, locale),
                        w.vintage, ...w.grapes,
                      ]
                        .filter(Boolean)
                        .join(' ')
                        .toLowerCase();
                      return (
                        <li
                          key={w.id}
                          data-wine={haystack}
                          className="border-t border-rule/60 py-3 first:border-0"
                        >
                          <div className="flex flex-wrap items-baseline gap-x-2">
                            <span className="tabular-nums text-ink-faint">
                              {w.vintage ?? t('nonVintage')}
                            </span>
                            <span className="font-medium">{w.producer}</span>
                            {w.name && <span>{w.name}</span>}
                            {size && <span className="text-sm text-ink-faint">{size}</span>}
                            {w.sommelier_pick && (
                              <span className="rounded-sm bg-paper-2 px-2 py-0.5 text-xs uppercase tracking-wide text-brass">
                                {t('pick')}
                              </span>
                            )}
                            <span className="ml-auto font-display text-lg tabular-nums">
                              {money.format(w.bottle)}
                              {w.glass !== null && (
                                <span className="ml-3 text-sm font-normal text-ink-faint">
                                  {money.format(w.glass)} {t('byGlass')}
                                </span>
                              )}
                            </span>
                          </div>

                          {(w.grapes.length > 0 || w.tasting_note) && (
                            <p className="mt-1 text-sm text-ink-faint">
                              {w.grapes.join(' - ')}
                              {w.grapes.length > 0 && w.tasting_note ? '  |  ' : ''}
                              {w.tasting_note}
                            </p>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </section>
          );
        })}
      </div>

      {updated && (
        <p className="mt-14 border-t border-rule pt-4 text-xs text-ink-faint">
          {t('updated', {
            date: new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(new Date(updated)),
          })}
        </p>
      )}

      {/* Hier stond een reserveerknop, net boven dezelfde knop in de vaste
          balk. Ze las haar opschrift ook niet uit de vertalingen maar had er
          drie van zichzelf, waarvan het Franse "Reserver" zonder accent was. */}
    </div>
  );
}
