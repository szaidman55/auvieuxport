import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

type CookieList = { name: string; value: string; options?: CookieOptions }[];

// Voor server components en route handlers. Draait onder de anon key, dus
// row level security blijft gelden - ook voor de beheerder.
export async function supabaseServer() {
  const store = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => store.getAll(),
        setAll: (list: CookieList) => {
          try {
            list.forEach(({ name, value, options }) => store.set(name, value, options));
          } catch {
            // Aangeroepen vanuit een server component: het middleware verzet
            // de sessie al. Hier niets doen is juist.
          }
        },
      },
    },
  );
}

// Leest publieke gegevens zonder sessie. Gebruikt voor de kaart en de kelder,
// die toch voor iedereen leesbaar zijn, zodat pagina's statisch kunnen blijven.
export function supabasePublic() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } },
  );
}
