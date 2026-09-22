import { AuthGate } from '@/components/admin/AuthGate';

export const dynamic = 'force-dynamic';

// Nog leeg, op verzoek.
//
// Hier komt het afdrukken van de wijnkaart, de kaart en de suggesties, voor
// de manager en voor de vloer. Het tabblad staat er alvast, zodat de plek
// bekend is; wat er komt te staan is nog niet beslist.
export default function AdminPrintPage() {
  return (
    <AuthGate>
      <h1 className="text-3xl">Afdrukken</h1>
      <p className="mt-3 max-w-prose text-ink-soft">
        Hier komt het afdrukken van de wijnkaart, de kaart en de suggesties.
        Nog niet gebouwd.
      </p>
    </AuthGate>
  );
}
