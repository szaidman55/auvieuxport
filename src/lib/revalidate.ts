/**
 * De site vragen de gewijzigde pagina's opnieuw te bouwen.
 *
 * Aangeroepen vanuit de beheerschermen, na een geslaagde wijziging. Nooit
 * ervoor: een pagina vernieuwen op grond van iets wat de database uiteindelijk
 * geweigerd heeft, zet juist de oude tekst weer vast.
 *
 * Mislukt dit, dan is dat geen ramp en ook geen reden om de zaal een rode
 * foutmelding te tonen: de wijziging staat opgeslagen, en de pagina ververst
 * zichzelf binnen het uur alsnog. Vandaar een zin die dat zegt in plaats van
 * een throw.
 */
export type RevalidateScope = 'menu' | 'wines' | 'hours' | 'team';

export async function revalidate(scope: RevalidateScope): Promise<string | null> {
  try {
    const res = await fetch('/api/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scope }),
    });
    if (res.ok) return null;
    return 'Bewaard. De site ververst zichzelf binnen het uur.';
  } catch {
    return 'Bewaard. De site ververst zichzelf binnen het uur.';
  }
}
