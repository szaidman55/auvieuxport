import Link from 'next/link';
import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Beheer - Au Vieux Port',
  // Het beheer hoort nergens in een zoekresultaat.
  robots: { index: false, follow: false },
};

const tabs = [
  { href: '/admin', label: 'Overzicht' },
  { href: '/admin/menu', label: 'De kaart' },
  { href: '/admin/wines', label: 'De kelder' },
  { href: '/admin/hours', label: 'Uren' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl-BE">
      <body>
        <header className="border-b border-rule bg-paper-2">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
            <span className="font-display text-lg">Au Vieux Port</span>
            <nav className="flex flex-wrap gap-x-5" aria-label="Beheer">
              {tabs.map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className="flex min-h-11 items-center text-sm text-ink-soft hover:text-ink"
                >
                  {tab.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/"
              className="ml-auto flex min-h-11 items-center text-sm underline underline-offset-4"
            >
              Naar de site
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
      </body>
    </html>
  );
}
