'use client';

import { useEffect, useRef, useState } from 'react';

// De zaal in beweging, achter de belofte.
//
// Zelf gehost, en dat is de hele bedoeling. De oude site hing hier een
// YouTube-venster; dat zet zes cookies voordat iemand iets aanklikt, waarvan
// een met een houdbaarheid tot in 2027, en vraagt dus om een toestemmingsbalk
// op elke pagina. Hier gaat er geen enkel verzoek naar een derde partij.
//
// Een telefoon kreeg eerst alleen de poster te zien, om de 1,8 MB te sparen.
// Dat was de verkeerde afweging: de kop is juist wat men op een telefoon
// toont. Nu krijgt een klein scherm een eigen, lichtere versnijding van
// 0,75 MB. Het beeld staat achter een donkere sluier, dus dat het zachter is
// ziet niemand.
//
// Wie bewegende beelden liever vermijdt, of wie databesparing aan heeft,
// krijgt nog altijd alleen de poster. Het eerste is geen randgeval:
// draaiende achtergronden maken sommige mensen misselijk. Het tweede is
// gewoon beleefd tegenover iemand op een duur of traag abonnement.

type Variant = 'small' | 'large' | null;

// Boven deze breedte is het brede bestand de moeite waard.
const WIDE = '(min-width: 768px)';

export function HeroVideo({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [variant, setVariant] = useState<Variant>(null);

  useEffect(() => {
    const wide = window.matchMedia(WIDE);
    const stillness = window.matchMedia('(prefers-reduced-motion: reduce)');

    const decide = () => {
      // De browser hoeft dit niet te ondersteunen; dan is het gewoon niet aan.
      const saveData = (
        navigator as Navigator & { connection?: { saveData?: boolean } }
      ).connection?.saveData;

      if (stillness.matches || saveData) {
        setVariant(null);
        return;
      }
      setVariant(wide.matches ? 'large' : 'small');
    };

    decide();
    wide.addEventListener('change', decide);
    stillness.addEventListener('change', decide);
    return () => {
      wide.removeEventListener('change', decide);
      stillness.removeEventListener('change', decide);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !variant) return;
    // load() is nodig omdat de bronnen er bij de eerste render nog niet waren,
    // en omdat ze wisselen wanneer het venster over de grens gaat.
    //
    // Hier stond ook meteen play(). Dat werkte niet: load() is nog bezig, dus
    // de belofte van play() breekt af met een AbortError, en die viel in een
    // lege catch. Het afspelen hangt nu aan het autoplay-attribuut, dat de
    // browser zelf afhandelt zodra er beeld is.
    el.load();
  }, [variant]);

  // Vangnet voor een browser die na een verwisselde bron niet uit zichzelf
  // hervat. Weigert hij alsnog, dan blijft de poster staan, en dat is precies
  // wat een bezoeker dan hoort te zien.
  const nudge = () => {
    const el = ref.current;
    if (el?.paused) void el.play().catch(() => {});
  };

  // Een browser zet de video stil zodra het tabblad naar de achtergrond gaat.
  // Dat hoort zo, en het scheelt batterij. Alleen hervat niet elke browser uit
  // zichzelf wanneer men terugkomt, en dan staat er een stilstaand beeld waar
  // beweging hoort.
  useEffect(() => {
    if (!variant) return;
    const resume = () => {
      if (document.visibilityState === 'visible') nudge();
    };
    document.addEventListener('visibilitychange', resume);
    return () => document.removeEventListener('visibilitychange', resume);
  }, [variant]);

  return (
    <video
      ref={ref}
      poster="/img/hero-poster.webp"
      autoPlay
      muted
      loop
      playsInline
      /* preload stond hier hard op "none", en dat vecht met autoplay.
         Safari op iOS neemt die hint letterlijk: niets laden, dus ook niets om
         af te spelen, dus blijft de poster staan. Zolang er geen bronnen zijn
         valt er toch niets te laden, dus "none" leverde daar niets op. Zodra
         we besloten hebben te spelen, mag hij laden. */
      preload={variant ? 'auto' : 'none'}
      aria-hidden="true"
      tabIndex={-1}
      onCanPlay={nudge}
      className={className}
    >
      {variant === 'large' && <source src="/video/hero.webm" type="video/webm" />}
      {variant === 'large' && <source src="/video/hero.mp4" type="video/mp4" />}
      {/* Voor het kleine scherm geen webm: vp9 kwam daar groter uit dan h264,
          en h264 speelt overal. */}
      {variant === 'small' && <source src="/video/hero-sm.mp4" type="video/mp4" />}
    </video>
  );
}
