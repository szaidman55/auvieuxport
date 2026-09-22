'use client';

import { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';
import { displayIdentity } from '@/lib/identity';

// Wie ben ik hier, en wat mag ik.
//
// Dit ontbrak, en dat kostte een avond zoeken. Sacha meldde zich aan met zijn
// voornaam, kreeg alle schermen te zien, en elke bewaaractie faalde stil: de
// managerrol hing aan een ander account, dat op zijn e-mailadres. Het beheer
// zei daar niets over, want het wist alleen of er een sessie was, niet welke.
//
// De rol komt uit de database, niet uit iets wat de browser beweert. Row level
// security laat iedereen precies zijn eigen rij lezen, dus dit is dezelfde
// waarheid waarop het opslaan straks wel of niet afketst.

type Identity =
  | { status: 'loading' }
  | { status: 'anonymous' }
  // Aangemeld, maar zonder rij in staff: alle schermen zichtbaar, niets mag.
  | { status: 'no-role'; who: string }
  | { status: 'ready'; who: string; role: 'floor' | 'manager'; active: boolean };

/**
 * Een plek waar bepaald wordt wie de beller is. Twee componenten lazen dit
 * eerst elk apart, wat twee keer hetzelfde vroeg en twee keer uit elkaar kon
 * lopen.
 */
function useIdentity(): Identity {
  const [identity, setIdentity] = useState<Identity>({ status: 'loading' });

  useEffect(() => {
    const db = supabaseBrowser();
    let cancelled = false;

    async function look() {
      const { data: auth } = await db.auth.getUser();
      if (cancelled) return;

      if (!auth.user) {
        setIdentity({ status: 'anonymous' });
        return;
      }

      const who = displayIdentity(auth.user.email ?? '');

      const { data: row } = await db
        .from('staff')
        .select('name, role, active')
        .eq('user_id', auth.user.id)
        .maybeSingle();

      if (cancelled) return;

      setIdentity(
        row
          ? { status: 'ready', who: row.name || who, role: row.role, active: row.active }
          : { status: 'no-role', who },
      );
    }

    void look();
    const { data: sub } = db.auth.onAuthStateChange(() => void look());

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  return identity;
}

/** De regel in de kop van elk beheerscherm. */
export function WhoAmI() {
  const me = useIdentity();

  if (me.status === 'loading' || me.status === 'anonymous') return null;

  if (me.status === 'no-role') {
    return <span className="text-sm text-wine">Aangemeld als {me.who} · geen rechten</span>;
  }

  if (!me.active) {
    return <span className="text-sm text-wine">Aangemeld als {me.who} · uitgeschakeld</span>;
  }

  return (
    <span className="text-sm text-ink-soft">
      Aangemeld als <span className="font-medium text-ink">{me.who}</span>
      {' · '}
      {me.role === 'manager' ? 'manager' : 'vloer'}
    </span>
  );
}

/**
 * De uitleg die bij een lege of beperkte rol hoort, groot genoeg om te zien.
 *
 * Alleen op het overzicht, niet in de kop van elk scherm: een waarschuwing die
 * overal staat wordt nergens gelezen.
 */
export function RoleNotice() {
  const me = useIdentity();

  if (me.status === 'no-role') {
    return (
      <div className="mt-6 max-w-prose border border-wine/40 bg-paper-2 p-5">
        <p className="font-medium text-wine">Dit account staat niet in de ploeg.</p>
        <p className="mt-2 text-sm text-ink-soft">
          U ziet de schermen, maar de database weigert elke wijziging: er is geen
          rij voor {me.who} in de ploeglijst. Meld u aan met het account dat wel
          manager is, of laat een manager u toevoegen onder Mensen.
        </p>
      </div>
    );
  }

  if (me.status === 'ready' && !me.active) {
    return (
      <div className="mt-6 max-w-prose border border-wine/40 bg-paper-2 p-5">
        <p className="font-medium text-wine">Dit account is uitgeschakeld.</p>
        <p className="mt-2 text-sm text-ink-soft">
          De schermen openen nog, maar opslaan lukt niet. Een manager kan u weer
          inschakelen onder Mensen.
        </p>
      </div>
    );
  }

  if (me.status === 'ready' && me.role === 'floor') {
    return (
      <div className="mt-6 max-w-prose border border-rule bg-paper-2 p-5">
        <p className="font-medium">U bent aangemeld als vloer.</p>
        <p className="mt-2 text-sm text-ink-soft">
          U kunt gerechten en flessen op uitverkocht zetten en weer terug. De
          prijzen, de vertalingen, de uren en de ploeg blijven aan een manager.
          Die schermen zullen niet opslaan.
        </p>
      </div>
    );
  }

  return null;
}
