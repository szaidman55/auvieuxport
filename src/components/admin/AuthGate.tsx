'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Session } from '@supabase/supabase-js';
import { supabaseBrowser } from '@/lib/supabase/client';

// Deze poort verbergt alleen de schermen. Wat iemand werkelijk mag veranderen
// wordt afgedwongen door row level security in de database: een verborgen knop
// is geen rechtenmodel.
export function AuthGate({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const db = supabaseBrowser();

    db.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecked(true);
      if (!data.session) router.replace('/admin/login');
    });

    const { data: sub } = db.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      if (!next) router.replace('/admin/login');
    });

    return () => sub.subscription.unsubscribe();
  }, [router]);

  if (!checked) {
    return <p className="text-sm text-ink-faint">Even geduld.</p>;
  }

  if (!session) return null;

  return <>{children}</>;
}

export function SignOutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={async () => {
        await supabaseBrowser().auth.signOut();
        router.replace('/admin/login');
      }}
      className="min-h-11 text-sm underline underline-offset-4"
    >
      Afmelden
    </button>
  );
}
