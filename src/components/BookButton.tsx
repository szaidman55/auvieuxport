import { BookLink } from './BookLink';

type Props = {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
  className?: string;
};

/**
 * De reserveerknop in de kop, vanaf xl. Onder xl reserveert men via de vaste
 * balk onderaan, en in de pagina's zelf staat er geen meer: die kwamen telkens
 * vlak boven dezelfde knop in de balk terecht. Beide gaan via BookLink.
 *
 * Ze werkte maar één keer per pagina. De knoppen wezen naar #zc-action-open,
 * en de SDK van Zenchef luistert daarvoor naar hashchange - een gebeurtenis
 * die alleen afgaat als de hash verándert. Na de eerste klik stond
 * #zc-action-open al in de adresbalk, dus leverde elke volgende klik, op
 * welke knop ook, geen hashchange en dus geen venster op. Wie het venster
 * sloot en opnieuw wilde reserveren, kreeg een dode knop tot hij de pagina
 * herlaadde.
 *
 * De SDK heeft daarnaast een klikluisteraar op document die afgaat op elk
 * element met data-zc-action. Die kent geen geheugen en werkt dus elke keer.
 * Hij kijkt naar event.target zelf, niet naar een ouder, dus het attribuut
 * moet op de <a> staan en de inhoud moet tekst blijven. Dat gebeurt in
 * BookLink; hier staat alleen hoe de knop eruitziet.
 *
 * Het opschrift breekt nooit af: "Réserver une" / "table" over twee regels
 * maakt van een knop een alinea.
 *
 * Let op met verbergen: 'inline-flex' staat hieronder al in de basis, en een
 * 'hidden' die een aanroeper erachteraan plakt verliest het daarvan, want
 * Tailwind zet .hidden vóór .inline-flex in het bestand. Verberg deze knop
 * dus via een omhullende div, niet via className.
 */
export function BookButton({ children, variant = 'primary', className = '' }: Props) {
  const base =
    'inline-flex min-h-12 items-center justify-center whitespace-nowrap px-6 text-sm font-semibold tracking-wide uppercase transition-colors';
  const styles =
    variant === 'primary'
      ? 'bg-brass text-paper hover:bg-ink'
      : 'border border-rule text-ink hover:border-ink';

  return <BookLink className={`${base} ${styles} ${className}`}>{children}</BookLink>;
}
