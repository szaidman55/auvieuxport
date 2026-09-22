import { site } from '@/lib/site';

// De oude site had op de hele website geen enkele tel: link. Het nummer stond
// een keer als platte tekst in het midden van de pagina.
//
// Een telefoonnummer mag niet afbreken: "03 290" op de ene regel en "77 11"
// op de volgende leest als twee getallen, niet als een nummer om te bellen.
//
// Verbergen gaat via een omhullende div, niet via className: zie BookButton.
export function CallButton({
  label,
  className = '',
}: {
  label: string;
  className?: string;
}) {
  return (
    <a
      href={`tel:${site.phone}`}
      className={`inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap px-5 text-sm font-semibold ${className}`}
      aria-label={`${label}: ${site.phoneDisplay}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
        <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2Z" />
      </svg>
      {site.phoneDisplay}
    </a>
  );
}
