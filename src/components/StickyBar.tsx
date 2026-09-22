import { getTranslations } from 'next-intl/server';
import { site } from '@/lib/site';
import { BookLink } from './BookLink';

// Op een telefoon staan bellen en reserveren altijd binnen duimbereik.
// Respecteert de veilige zone onderaan, zodat de balk niet onder de
// systeembalk van de telefoon verdwijnt.
//
// Reserveren loopt via BookLink, net als elke knop in de pagina: deze balk
// wees rechtstreeks naar de hash en deed daardoor niets meer zodra er elders
// al een keer op reserveren was geklikt.
export async function StickyBar() {
  const t = await getTranslations('nav');

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-rule bg-paper sm:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
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
  );
}
