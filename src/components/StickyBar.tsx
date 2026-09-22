import { getTranslations } from 'next-intl/server';
import { site, zenchef } from '@/lib/site';

// Op een telefoon staan bellen en reserveren altijd binnen duimbereik.
// Respecteert de veilige zone onderaan, zodat de balk niet onder de
// systeembalk van de telefoon verdwijnt.
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
      <a
        href={zenchef.openAnchor}
        className="flex min-h-14 items-center justify-center whitespace-nowrap bg-brass px-2 text-sm font-semibold uppercase tracking-wide text-paper"
      >
        {t('book')}
      </a>
    </div>
  );
}
