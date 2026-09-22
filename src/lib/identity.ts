/**
 * Wie de zaal zegt te zijn bij het aanmelden.
 *
 * Supabase Auth kent geen gebruikersnamen: elk account is gesleuteld op iets
 * wat op een e-mailadres lijkt, en dat is geen instelling die we kunnen
 * uitzetten. Dus typt de zaal een kale voornaam en bouwt deze module het adres
 * eronder. `tom` wordt `tom@staff.restaurantauvieuxport.be`: een subdomein van
 * het huis dat bewust nooit gerouteerd wordt. Geen inbox, geen MX-record,
 * niets dat luistert. Het bestaat om een unieke sleutel te zijn, en niemand
 * ziet of typt het ooit.
 *
 * Wat dat kost: een voornaam heeft geen inbox, dus een "wachtwoord vergeten"
 * mail heeft nergens heen te gaan. Een wachtwoord opnieuw zetten is werk van
 * de manager in het Supabase-scherm, niet iets wat de persoon zelf doet.
 *
 * Een adres met een @ wordt ongemoeid doorgelaten. Dat is de weg terug naar
 * binnen: houd minstens een manager op een echte inbox, want een account
 * waarover niemand gemaild kan worden is een account dat niemand kan
 * terughalen.
 */

/** Nooit gerouteerd. Van het huis, zodat niemand anders ooit als de zaal kan ontvangen. */
export const STAFF_DOMAIN = 'staff.restaurantauvieuxport.be';

/**
 * Kortste wachtwoord dat het beheer aanneemt.
 *
 * Zes, op vraag van Sacha, en meteen ook het minimum dat Supabase zelf
 * aanhoudt. Eerlijk over wat dat betekent: dit beheer staat op het open
 * internet en een login erop kan elke prijs op de site veranderen. Zes tekens
 * is kort. Het is te verdedigen omdat het om een handvol mensen gaat die het
 * op een telefoon in de zaal typen, en een wachtwoord dat niemand kan onthouden
 * is een wachtwoord dat op een briefje naast de kassa hangt.
 *
 * Wat het gewicht wel draagt, als dit ooit zwaarder weegt dan gemak: de
 * ingebouwde snelheidsbegrenzing van Supabase op mislukte aanmeldingen, en
 * "leaked password protection" aanzetten in de Auth-instellingen.
 *
 * Een getal, gebruikt door het formulier en de API, zodat ze niet uit elkaar
 * kunnen lopen.
 */
export const MIN_PASSWORD = 6;

export function passwordError(password: string): string | null {
  if (password.length < MIN_PASSWORD) {
    return `Gebruik minstens ${MIN_PASSWORD} tekens.`;
  }
  return null;
}

/*
 * Begint met een letter, zodat een naam nooit als getal gelezen wordt, en
 * blijft in kleine letters: dat `Tom` en `tom` twee verschillende logins zijn
 * is het soort ding dat pas op een drukke vrijdag ontdekt wordt.
 */
const USERNAME = /^[a-z][a-z0-9._-]{1,31}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type Identity =
  | { ok: true; address: string; kind: 'username' | 'email' }
  | { ok: false; reason: string };

/**
 * Maak van wat iemand typte het adres waarop Supabase gesleuteld is.
 *
 * Hoofdletters en losse spaties worden hier weggenomen in plaats van vertrouwd
 * vanuit het formulier: een telefoontoetsenbord maakt de eerste letter
 * standaard een hoofdletter, en dat alleen al zou een mislukte aanmelding zijn
 * zonder zichtbare oorzaak.
 */
export function resolveIdentity(input: string): Identity {
  const value = input.trim().toLowerCase();

  if (!value) return { ok: false, reason: 'Typ uw naam.' };

  if (value.includes('@')) {
    if (!EMAIL.test(value)) return { ok: false, reason: 'Dat adres klopt niet.' };
    return { ok: true, address: value, kind: 'email' };
  }

  if (!USERNAME.test(value)) {
    return {
      ok: false,
      reason:
        'Een naam is 2 tot 32 tekens: eerst een letter, dan letters, cijfers, punt, streepje of liggend streepje.',
    };
  }

  return { ok: true, address: `${value}@${STAFF_DOMAIN}`, kind: 'username' };
}

/**
 * Wat er op het scherm hoort voor een opgeslagen adres.
 *
 * Het verzonnen domein is een implementatiedetail; het tonen zou iemand
 * uitnodigen om er een mail heen te sturen.
 */
export function displayIdentity(address: string): string {
  const suffix = `@${STAFF_DOMAIN}`;
  return address.endsWith(suffix) ? address.slice(0, -suffix.length) : address;
}
