import Link from 'next/link';
import { AuthGate, SignOutButton } from '@/components/admin/AuthGate';
import { RoleNotice } from '@/components/admin/WhoAmI';

export const dynamic = 'force-dynamic';

const cards = [
  {
    href: '/admin/menu',
    title: 'De kaart',
    body: 'Gerechten, prijzen, vertalingen en wat vandaag op is.',
  },
  {
    href: '/admin/wines',
    title: 'De kelder',
    body: '500 referenties. Zoeken, prijzen bijwerken, flessen van de kaart halen.',
  },
  {
    href: '/admin/hours',
    title: 'Openingsuren',
    body: 'De uren die op de site staan en die Google leest.',
  },
  {
    href: '/admin/mensen',
    title: 'Mensen',
    body: 'Wie zich mag aanmelden, met welke naam, en wat hij mag wijzigen.',
  },
];

export default function AdminHome() {
  return (
    <AuthGate>
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="text-3xl">Beheer</h1>
        <SignOutButton />
      </div>

      <p className="mt-3 max-w-prose text-ink-soft">
        Wat u hier wijzigt, staat binnen het uur op de site. Uitverkocht en op
        slaan meteen op.
      </p>

      <RoleNotice />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="border border-rule bg-paper-2 p-6 hover:border-ink"
          >
            <h2 className="font-display text-xl">{card.title}</h2>
            <p className="mt-2 text-sm text-ink-soft">{card.body}</p>
          </Link>
        ))}
      </div>
    </AuthGate>
  );
}
