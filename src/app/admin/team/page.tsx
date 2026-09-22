import { AuthGate } from '@/components/admin/AuthGate';
import { TeamEditor } from '@/components/admin/TeamEditor';

export const dynamic = 'force-dynamic';

export default function AdminTeamPage() {
  return (
    <AuthGate>
      <TeamEditor />
    </AuthGate>
  );
}
