import { AuthGate } from '@/components/admin/AuthGate';
import { HoursEditor } from '@/components/admin/HoursEditor';

export const dynamic = 'force-dynamic';

export default function AdminHoursPage() {
  return (
    <AuthGate>
      <HoursEditor />
    </AuthGate>
  );
}
