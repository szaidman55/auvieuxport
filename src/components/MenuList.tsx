import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { localised, type MenuItem, type MenuSection } from '@/lib/types';

function formatPrice(value: number): string {
  return new Intl.NumberFormat('nl-BE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export async function MenuList({
  sections,
  items,
  locale,
}: {
  sections: MenuSection[];
  items: MenuItem[];
  locale: Locale;
}) {
  const t = await getTranslations('menu');

  return (
    <div className="flex flex-col gap-12">
      {sections.map((section) => {
        const rows = items.filter((i) => i.section_id === section.id);
        if (rows.length === 0) return null;
        const note = localised(section, 'note', locale);

        return (
          <section key={section.id} aria-labelledby={`sec-${section.id}`}>
            <h3
              id={`sec-${section.id}`}
              className="mb-1 text-center text-2xl"
            >
              {localised(section, 'title', locale)}
            </h3>
            {note && (
              <p className="mx-auto mb-5 max-w-prose text-center text-sm text-ink-faint">
                {note}
              </p>
            )}

            <ul className="flex flex-col">
              {rows.map((item) => {
                const itemNote = localised(item, 'note', locale);
                // Een kaas gaat per stuk, een zeetong tegen dagprijs. Alleen
                // dat laatste is een lege prijs zonder meer.
                const priceNote = localised(item, 'price_note', locale);
                const price =
                  priceNote ??
                  (item.price === null
                    ? t('dayPrice')
                    : `${formatPrice(item.price)}${item.per_person ? ` ${t('perPerson')}` : ''}`);
                return (
                  <li
                    key={item.id}
                    className="flex flex-wrap items-baseline gap-x-2 gap-y-1 border-t border-rule/60 py-3 first:border-0"
                  >
                    <span className="flex-none text-base">
                      {localised(item, 'name', locale)}
                    </span>

                    {item.sold_out && (
                      <span className="rounded-sm bg-paper-2 px-2 py-0.5 text-xs uppercase tracking-wide text-wine">
                        {t('soldOut')}
                      </span>
                    )}
                    {item.requires_preorder && (
                      <span className="rounded-sm bg-paper-2 px-2 py-0.5 text-xs uppercase tracking-wide text-brass">
                        {t('preorder')}
                      </span>
                    )}
                    {/* De kolom stond in de databank en in alle drie de talen
                        klaar, maar werd nergens getoond - terwijl juist deze
                        keuken per seizoen verandert. */}
                    {item.seasonal && (
                      <span className="rounded-sm bg-paper-2 px-2 py-0.5 text-xs uppercase tracking-wide text-ink-soft">
                        {t('seasonal')}
                      </span>
                    )}

                    {/* De stippellijn is de conventie van de kaart zelf. */}
                    <span
                      className="mx-1 hidden min-w-6 flex-1 translate-y-[-0.3em] border-b border-dotted border-rule sm:block"
                      aria-hidden="true"
                    />

                    <span className="ml-auto flex-none font-display text-lg tabular-nums sm:ml-0">
                      {price}
                    </span>

                    {itemNote && (
                      <p className="w-full text-sm text-ink-faint">{itemNote}</p>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
