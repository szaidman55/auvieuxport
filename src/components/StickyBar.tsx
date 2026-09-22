import { getTranslations } from 'next-intl/server';
import { site } from '@/lib/site';
import { BookLink } from './BookLink';

/**
 * Bellen en reserveren, altijd binnen bereik.
 *
 * Loopt tot xl en niet tot sm. De kop toont haar reserveerknop pas vanaf
 * 1280 pixels, want daaronder plooit ze samen tot een hamburger. Deze balk
 * stopte op 640, dus tussen 640 en 1280 stond er geen enkele vaste
 * reserveerknop op het scherm: daar hing alles af van een knop in de pagina
 * zelf, die wegscrolt. Nu neemt de een het over waar de ander ophoudt.
 *
 * De knoppen zelf blijven op leesbare breedte staan in plaats van over een
 * heel breed scherm uit te rekken; de balk loopt wel door tot de rand.
 *
 * Respecteert de veilige zone onderaan, zodat de balk niet onder de
 * systeembalk van de telefoon verdwijnt.
 *
 * Reserveren loopt via BookLink, net als elke knop in de pagina: deze balk
 * wees rechtstreeks naar de hash en deed daardoor niets meer zodra er elders
 * al een keer op reserveren was geklikt.
 */
export async function StickyBar() {
  const t = await getTranslations('nav');

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-paper xl:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="mx-auto grid max-w-md grid-cols-2">
        <a
          href={`tel:${site.phone}`}
          className="flex min-h-14 items-center justify-center gap-2 whitespace-nowrap border-r border-rule px-2 text-sm font-semibold"
        >
          {t('call')}
        </a>
        <BookLink className="flex min-h-14 items-center justify-center whitespace-nowrap bg-brass px-2 text-sm font-semibold uppercase tracking-wide text-paper">
          {t('book')}
        </BookLink>
      </div>
    </div>
  );
}
