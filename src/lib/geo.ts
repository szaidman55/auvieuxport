import type { Locale } from '@/i18n/routing';

/**
 * Land- en streeknamen van de wijnkaart, in de taal van de bezoeker.
 *
 * De 500 referenties komen uit de PDF van het huis, en die zet land en streek
 * in het Engels. Op de Franse kaart stond daardoor "FRANCE · BURGUNDY ·
 * REGIONAL" boven de bourgognes, op de Nederlandse "BURGUNDY" - in geen van
 * beide talen hoe een sommelier of een gast het schrijft.
 *
 * Alleen land en streek staan hier. Appellaties niet: Pauillac, Chablis en
 * Saint-Emilion zijn beschermde namen die in elke taal hetzelfde blijven, en
 * ze vertalen zou ze fout maken. "Regional" is de uitzondering, want dat is
 * geen appellatie maar het woord dat de kaart gebruikt voor de streekwijnen.
 *
 * Wat hier niet in staat, blijft staan zoals het in de databank staat. Zo
 * hoeft Bordeaux, Champagne of Priorat geen regel, en valt een nieuwe streek
 * zichtbaar terug op zichzelf in plaats van leeg te blijven.
 */
const GEO: Record<string, Partial<Record<Locale, string>>> = {
  // Landen
  Austria: { nl: 'Oostenrijk', fr: 'Autriche' },
  Belgium: { nl: 'België', fr: 'Belgique' },
  France: { nl: 'Frankrijk' },
  Germany: { nl: 'Duitsland', fr: 'Allemagne' },
  Italy: { nl: 'Italië', fr: 'Italie' },
  'South Africa': { nl: 'Zuid-Afrika', fr: 'Afrique du Sud' },
  Spain: { nl: 'Spanje', fr: 'Espagne' },
  USA: { nl: 'Verenigde Staten', fr: 'États-Unis' },

  // Streken
  Alsace: { nl: 'Elzas' },
  Burgundy: { nl: 'Bourgogne', fr: 'Bourgogne' },
  Canarias: { nl: 'Canarische Eilanden', en: 'Canary Islands', fr: 'Canaries' },
  'Castilla y Leon': { nl: 'Castilië en León', en: 'Castilla y León', fr: 'Castille-et-León' },
  Catalunya: { nl: 'Catalonië', en: 'Catalonia', fr: 'Catalogne' },
  Corsica: { fr: 'Corse' },
  Galicia: { nl: 'Galicië', fr: 'Galice' },
  Piedmont: { nl: 'Piëmont', fr: 'Piémont' },
  Puglia: { nl: 'Apulië', fr: 'Pouilles' },
  'Rhone Valley': { nl: 'Rhônevallei', en: 'Rhône Valley', fr: 'Vallée du Rhône' },
  Sicily: { nl: 'Sicilië', fr: 'Sicile' },
  Tuscany: { nl: 'Toscane', fr: 'Toscane' },
  Veneto: { fr: 'Vénétie' },

  // Geen appellatie maar een woord
  Regional: { nl: 'Regionaal', fr: 'Régional' },
};

/**
 * Bij 24 van de 500 referenties staat er in de appellatiekolom geen plaats
 * maar een assemblage of een proefnotitie: "100% Carricante", "75% Tempranillo
 * - 15% Garnacha", "80% only stainless steel - 20% ageing on big casks". Die
 * stonden als streeknaam in de kop boven de wijnen, in alle drie de talen.
 *
 * Een plaatsnaam draagt geen cijfer. Dat is een smalle regel, en met opzet:
 * ze haalt er alleen weg wat zeker geen plaats is. Wat overblijft hoort in de
 * databank rechtgezet te worden, niet hier weggefilterd.
 */
function isPlace(part: string): boolean {
  return !/[0-9]/.test(part);
}

export function geoName(value: string, locale: Locale): string {
  return GEO[value]?.[locale] ?? value;
}

/**
 * De kop boven een groep wijnen: land · streek · appellatie.
 *
 * Twee dingen uit de PDF worden hier rechtgezet. De kaart scheidt binnen een
 * appellatie met een verticale streep - "Côte d'Or | Chambolle-Musigny" -
 * terwijl de kop zelf met een punt scheidt, dus stonden er twee tekens door
 * elkaar in één regel. En waar streek en appellatie hetzelfde woord zijn,
 * zoals bij de Elzas, stond het er twee keer achter elkaar.
 */
export function geoHeading(
  parts: (string | null)[],
  locale: Locale,
): string {
  const seen = new Set<string>();

  return parts
    .filter((p): p is string => Boolean(p))
    .flatMap((part) => part.split('|').map((p) => p.trim()))
    .filter(Boolean)
    .filter(isPlace)
    .map((p) => geoName(p, locale))
    .filter((p) => {
      const key = p.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .join(' · ');
}
