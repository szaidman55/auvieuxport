import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

// Een keuze uit de eigen reportagefoto's van het huis: de zaal, de kelder,
// het werk aan tafel en een paar borden. Geen carrousel: die verbergt de
// helft en vraagt om een klik voor iets wat gewoon zichtbaar mag zijn.
type Shot = { src: string; w: number; h: number; alt: Record<string, string>; span?: string };

const SHOTS: Shot[] = [
  {
    src: '/img/photos/avp-15.webp', w: 1600, h: 1066, span: 'sm:col-span-2 sm:row-span-2',
    alt: { nl: 'De zaal, gedekt voor de dienst', en: 'The dining room, set for service', fr: 'La salle, dressée pour le service' },
  },
  {
    src: '/img/photos/avp-06.webp', w: 1600, h: 1066,
    alt: { nl: 'De maître aan de Presse à Canard', en: 'The maître at the Presse à Canard', fr: 'Le maître à la Presse à Canard' },
  },
  {
    src: '/img/photos/avp-13.webp', w: 1066, h: 1600,
    alt: { nl: 'Flamberen aan tafel', en: 'Flambéing at the table', fr: 'Flambage en salle' },
  },
  {
    src: '/img/photos/avp-11.webp', w: 1600, h: 1066,
    alt: { nl: 'De wijnkelder', en: 'The wine cellar', fr: 'La cave à vins' },
  },
  {
    src: '/img/photos/avp-18.webp', w: 1066, h: 1600,
    alt: { nl: 'De eend, voor het versnijden', en: 'The duck, before carving', fr: 'Le canard, avant la découpe' },
  },
  {
    src: '/img/photos/avp-03.webp', w: 1066, h: 1600,
    alt: { nl: 'Een bord uit de keuken', en: 'A plate from the kitchen', fr: 'Une assiette de la cuisine' },
  },
  {
    src: '/img/photos/avp-25.webp', w: 1066, h: 1600,
    alt: { nl: 'De zaal bij daglicht', en: 'The dining room in daylight', fr: 'La salle à la lumière du jour' },
  },
  {
    src: '/img/photos/avp-20.webp', w: 1066, h: 1600,
    alt: { nl: 'Groenten uit de Provence', en: 'Vegetables from Provence', fr: 'Légumes de Provence' },
  },
];

export async function Gallery({ locale }: { locale: string }) {
  const t = await getTranslations('gallery');

  return (
    <section aria-labelledby="gallery-title" className="border-t border-rule">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <h2 id="gallery-title" className="text-center text-3xl sm:text-4xl">
          {t('title')}
        </h2>
        <p className="mx-auto mt-4 max-w-prose text-center text-ink-soft">{t('intro')}</p>

        <ul className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {SHOTS.map((s, i) => (
            <li key={s.src} className={s.span ?? ''}>
              <Image
                src={s.src}
                alt={s.alt[locale] ?? s.alt.nl}
                width={s.w}
                height={s.h}
                sizes="(max-width: 640px) 50vw, 25vw"
                loading={i < 2 ? 'eager' : 'lazy'}
                className="h-full w-full bg-paper-2 object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
