import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

// Het gerecht waar het huis om bekendstaat, in de vier stappen die de gast
// aan tafel ziet. De foto's zijn van het huis zelf.
const STEPS = ['pers', 'versnijden', 'saus', 'bord'] as const;

const SRC: Record<(typeof STEPS)[number], string> = {
  pers: '/img/canard/1-pers.webp',
  versnijden: '/img/canard/2-versnijden.webp',
  saus: '/img/canard/3-saus.webp',
  bord: '/img/canard/4-bord.webp',
};

export async function Canard() {
  const t = await getTranslations('canard');

  return (
    <section aria-labelledby="canard-title" className="border-t border-rule bg-paper-2">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
            {t('eyebrow')}
          </p>
          <h2 id="canard-title" className="mt-3 text-3xl sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-ink-soft">{t('intro')}</p>
        </div>

        {/* Genummerd blijft het, want de volgorde is de helft van het
            verhaal, en een schermlezer kondigt "1 van 4" gewoon aan. Maar de
            cijfers staan er niet bij: een gerecht dat aan tafel bereid wordt
            leest niet als een handleiding. */}
        <ol className="mt-12 grid grid-cols-2 gap-x-3 gap-y-6 lg:grid-cols-4">
          {STEPS.map((step) => (
            <li key={step}>
              <Image
                src={SRC[step]}
                alt={t(`steps.${step}`)}
                width={1200}
                height={800}
                sizes="(max-width: 1024px) 50vw, 25vw"
                loading="lazy"
                className="w-full bg-paper object-cover"
              />
              <p className="mt-3 text-sm text-ink-soft">{t(`steps.${step}`)}</p>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-center text-sm text-ink-faint">{t('preorder')}</p>
      </div>
    </section>
  );
}
