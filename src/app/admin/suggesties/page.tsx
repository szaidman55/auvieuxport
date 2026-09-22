import { AuthGate } from '@/components/admin/AuthGate';
import { MenuEditor } from '@/components/admin/MenuEditor';

export const dynamic = 'force-dynamic';

// Dezelfde editor als de kaart, met de secties die als suggestie gemarkeerd
// staan. Een suggestie is een gerecht met een kortere houdbaarheid, niet een
// ander soort ding, dus het scherm hoeft er ook geen ander soort ding van te
// maken.
export default function AdminSuggestionsPage() {
  return (
    <AuthGate>
      <MenuEditor mode="suggestions" />
    </AuthGate>
  );
}
