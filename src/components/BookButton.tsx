import { zenchef } from '@/lib/site';

type Props = {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
  className?: string;
};

// Elke reserveerknop op de site is deze knop. De oude site had er geen enkele
// boven de vouw en moest onderaan uitleggen waar de knop stond.
//
// Het opschrift breekt nooit af: "Réserver une" / "table" over twee regels
// maakt van een knop een alinea, en duwde de kop op een telefoon uit elkaar.
//
// Let op met verbergen: 'inline-flex' staat hieronder al in de basis, en een
// 'hidden' die een aanroeper erachteraan plakt verliest het daarvan, want
// Tailwind zet .hidden vóór .inline-flex in het bestand. Verberg deze knop
// dus via een omhullende div, niet via className.
export function BookButton({ children, variant = 'primary', className = '' }: Props) {
  const base =
    'inline-flex min-h-12 items-center justify-center whitespace-nowrap px-6 text-sm font-semibold tracking-wide uppercase transition-colors';
  const styles =
    variant === 'primary'
      ? 'bg-brass text-paper hover:bg-ink'
      : 'border border-rule text-ink hover:border-ink';

  return (
    <a href={zenchef.openAnchor} className={`${base} ${styles} ${className}`}>
      {children}
    </a>
  );
}
