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
// toont. Een klein scherm krijgt nu een eigen, lichtere versnijding van
// 0,75 MB. Het beeld staat achter een donkere sluier, dus dat het zachter is
// ziet niemand.
//
// De keuze tussen die bestanden stond eerst in JavaScript: eerst een <video>
// zonder bronnen, daarna de juiste erin hangen en load() roepen. Chrome
// begint dan alsnog te spelen, Safari op de telefoon niet. Die weegt bij het
// inlezen van de pagina af of een video vanzelf mag starten, en een video
// zonder bron komt door die weging niet heen; wat er daarna bij geschoven
// wordt is voor hem een gewone, door script gestarte film, en die vraagt om
// een vinger. Vandaar dat het beeld op een telefoon stil bleef staan.
//
// Nu doet het media-attribuut op <source> dat werk. Dat staat in de HTML die
// het toestel binnenkrijgt, dus er is een bron voordat er ook maar een regel
// JavaScript gelopen heeft, en de gewone autoplay volstaat.
//
// Dezelfde truc dekt wie bewegende beelden liever vermijdt: geen enkele bron
// komt dan door de media-toets, en er blijft netjes een stilstaande poster
// over. Dat is geen randgeval; draaiende achtergronden maken sommige mensen
// misselijk.

const WIDE = '(min-width: 768px) and (prefers-reduced-motion: no-preference)';
const NARROW = '(max-width: 767px) and (prefers-reduced-motion: no-preference)';

export function HeroVideo({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [saveData, setSaveData] = useState(false);

  // Het enige wat de server niet weten kan. Databesparing is een instelling
  // van het toestel, geen mediavraag, dus die blijft hier hangen. Begint op
  // false, gelijk aan wat de server rendert, zodat de hydratie klopt.
  useEffect(() => {
    const zuinig = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;
    if (zuinig) setSaveData(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !saveData) return;
    // De bronnen zijn zojuist uit de boom gehaald; load() laat hem dat zien,
    // en dan valt hij terug op de poster.
    el.pause();
    el.load();
  }, [saveData]);

  // Vangnet. Een browser zet de video stil zodra het tabblad naar de
  // achtergrond gaat; dat hoort zo en het scheelt batterij. Alleen hervat niet
  // elke browser uit zichzelf wanneer men terugkomt, en dan staat er een
  // stilstaand beeld waar beweging hoort. Weigert hij alsnog, dan blijft de
  // poster staan, en dat is precies wat een bezoeker dan hoort te zien.
  const nudge = () => {
    const el = ref.current;
    if (el?.paused && !saveData) void el.play().catch(() => {});
  };

  useEffect(() => {
    const resume = () => {
      if (document.visibilityState === 'visible') nudge();
    };
    document.addEventListener('visibilitychange', resume);
    return () => document.removeEventListener('visibilitychange', resume);
  });

  // Tweede vangnet, voor het einde van de lus.
  //
  // Het loop-attribuut hoort dit zelf te doen. WebKit deed het niet, en de
  // reden lag in het bestand: de bewerkingslijst schoof de weergave twee
  // beeldjes vooruit, waardoor de laatste tachtig milliseconden geen beeld
  // meer hadden. Daar liep hij vast in plaats van terug naar nul te gaan.
  // Dat is bij de hercodering rechtgezet, maar het is niet iets wat wij hier
  // kunnen narekenen op een toestel dat wij niet in handen hebben, dus blijft
  // er een grendel op staan.
  //
  // ended vuurt niet wanneer loop aan staat, dus als die handler iets te doen
  // krijgt, dan omdat de lus het liet afweten. De wachter ernaast dekt het
  // geval waarin hij aan het eind blijft hangen zonder iets te melden: alleen
  // vlak bij het einde, zodat een haperende download niet ineens naar het
  // begin springt.
  useEffect(() => {
    const el = ref.current;
    if (!el || saveData) return;

    const opnieuw = () => {
      try {
        el.currentTime = 0;
      } catch {
        return;
      }
      void el.play().catch(() => {});
    };

    let vorige = -1;
    const wachter = window.setInterval(() => {
      if (el.paused || document.visibilityState !== 'visible') return;
      const eind = el.duration;
      const stilstand = el.currentTime === vorige;
      vorige = el.currentTime;
      if (stilstand && Number.isFinite(eind) && eind - el.currentTime < 0.5) opnieuw();
    }, 2000);

    el.addEventListener('ended', opnieuw);
    return () => {
      window.clearInterval(wachter);
      el.removeEventListener('ended', opnieuw);
    };
  }, [saveData]);

  return (
    <video
      ref={ref}
      poster="/img/hero-poster.webp"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      onCanPlay={nudge}
      className={className}
    >
      {!saveData && (
        <>
          <source src="/video/hero.webm" type="video/webm" media={WIDE} />
          <source src="/video/hero.mp4" type="video/mp4" media={WIDE} />
          {/* Voor het kleine scherm geen webm: vp9 kwam daar groter uit dan
              h264, en h264 speelt overal. */}
          <source src="/video/hero-sm.mp4" type="video/mp4" media={NARROW} />
        </>
      )}
    </video>
  );
}
