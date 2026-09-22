import { AuthGate } from '@/components/admin/AuthGate';
import { WineEditor } from '@/components/admin/WineEditor';

export const dynamic = 'force-dynamic';

export default function AdminWinesPage() {
  return (
    <AuthGate>
      <WineEditor />
    </AuthGate>
  );
}
