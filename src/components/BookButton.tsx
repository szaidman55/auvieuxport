import { zenchef } from '@/lib/site';

type Props = {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
  className?: string;
};

// Elke reserveerknop op de site is deze knop. De oude site had er geen enkele
// boven de vouw en moest onderaan uitleggen waar de knop stond.
export function BookButton({ children, variant = 'primary', className = '' }: Props) {
  const base =
    'inline-flex min-h-12 items-center justify-center px-6 text-sm font-semibold tracking-wide uppercase transition-colors';
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
