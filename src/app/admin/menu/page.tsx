import { AuthGate } from '@/components/admin/AuthGate';
import { MenuEditor } from '@/components/admin/MenuEditor';

export const dynamic = 'force-dynamic';

export default function AdminMenuPage() {
  return (
    <AuthGate>
      <MenuEditor />
    </AuthGate>
  );
}
