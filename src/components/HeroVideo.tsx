'use client';

import { useEffect, useRef, useState } from 'react';

// De zaal in beweging, achter de belofte.
//
// Zelf gehost, en dat is de hele bedoeling. De oude site hing hier een
// YouTube-venster; dat zet zes cookies voordat iemand iets aanklikt, waarvan
// een met een houdbaarheid tot in 2027, en vraagt dus om een toestemmingsbalk
// op elke pagina. Hier gaat er geen enkel verzoek naar een derde partij.
//
// Een telefoon kreeg eerst alleen de poster te zien, om de megabytes te
// sparen. Dat was de verkeerde afweging: de kop is juist wat men op een
// telefoon toont. Een klein scherm krijgt nu een eigen, lichtere versnijding
// van 1,88 MB tegen 5,56 MB voor het brede beeld. Het beeld staat achter een
// donkere sluier, dus dat het zachter is ziet niemand.
//
// De lus duurt 62,32 s en niet langer. De bron is 78,97 s, waarvan de laatste
// 3,5 s een reclame van de downloader is. Wat overblijft begint op een wit
// tafellaken en eindigt op een donkere gevel, dus een letterlijke lus zou elke
// ronde een sprong van 69 punten helderheid maken. Daarom staan de twee helften
// omgedraaid: eerst 54,4-75 s, dan 12,68-54,4 s. Zo opent de lus nog altijd op
// de zaal met de vlam, hetzelfde beeld als de poster, en valt de naad op een
// snede die in de film zelf al zat.
//
// De keuze tussen die bestanden staat in het media-attribuut op <source>, dus
// in de HTML die het toestel binnenkrijgt. Dat is geen stijlkwestie maar een
// noodzaak: Safari weegt bij het inlezen van de pagina af of een film vanzelf
// mag starten, en een video zonder bron komt door die weging niet heen. Wat
// JavaScript er daarna bij schuift geldt als door script gestart, en dat
// vraagt om een vinger.
//
// ---------------------------------------------------------------------------
// Bewuste uitzondering op prefers-reduced-motion
// ---------------------------------------------------------------------------
// Hier stond `and (prefers-reduced-motion: no-preference)` op elke bron, zodat
// er bij die voorkeur niets te spelen viel. Dat is eruit, om dezelfde reden
// als bij het neonbord van Tannin: op iOS zet men Reduce Motion aan voor het
// inzoomen bij het openen van een app en voor parallax, niet voor een rustig
// zaalbeeld achter een donkere sluier.
//
// Net als daar mag dat alleen omdat het nagerekend is. Gemeten over de 1558
// beelden van de lus:
//   - scenedetectie op 0,30 vindt geen enkele harde snede; op 0,20 telt de
//     montage er 53, ongeveer een per anderhalve seconde;
//   - helderheid tussen 35,6 en 143,2 van 255, dus nooit donker-naar-wit;
//   - zeventien omslagen van meer dan 20 punten in 62,32 s, oftewel 0,27 per
//     seconde, tegen een WCAG-grens van 3.
// Er zit geen geluid op en het beeld ligt onder een verloop van 70 tot 95%
// inkt. Komt er ooit ander materiaal in, dan moet dit opnieuw gemeten worden
// voordat het hier mag hangen.
//
// Wat wij hiermee niet oplossen: Safari op iOS weigert zelf te starten zodra
// Auto-Play Video Previews uit staat, en dat gaat samen met Reduce Motion. Een
// CSS-animatie kent die rem niet, een video wel. Vandaar de ontgrendeling
// hieronder: de eerste aanraking waar dan ook op de pagina zet hem alsnog aan.
// Dat is geen omzeiling van het beleid maar de bedoelde weg eromheen; het
// beleid vraagt om een handeling van de bezoeker, en die komt er toch.
//
// Databesparing blijft wel gerespecteerd. Dat is geen uitspraak over beweging
// maar over iemands abonnement, en daar gaan wij niet overheen.

const WIDE = '(min-width: 768px)';
const NARROW = '(max-width: 767px)';

export function HeroVideo({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [saveData, setSaveData] = useState(false);

  // Het enige wat de server niet weten kan. Databesparing is een instelling
  // van het toestel, geen mediavraag. Begint op false, gelijk aan wat de
  // server rendert, zodat de hydratie klopt.
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
  // elke browser uit zichzelf wanneer men terugkomt. Weigert hij alsnog, dan
  // blijft de poster staan, en dat is precies wat een bezoeker dan hoort te
  // zien.
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

  // De ontgrendeling. Weigerde de browser uit zichzelf te starten, dan is de
  // eerste aanraking, klik of toetsaanslag genoeg toestemming. Scrollen telt
  // op iOS niet als handeling, dus dat staat er niet bij; het zou alleen een
  // afgewezen belofte opleveren. Lukt het, dan ruimen de luisteraars zichzelf
  // op.
  useEffect(() => {
    const el = ref.current;
    if (!el || saveData) return;

    const soorten = ['pointerdown', 'touchstart', 'keydown'] as const;
    const stop = () => soorten.forEach((s) => document.removeEventListener(s, kick));

    const kick = () => {
      if (!el.paused) {
        stop();
        return;
      }
      el.play().then(stop, () => {});
    };

    soorten.forEach((s) => document.addEventListener(s, kick, { passive: true }));
    return stop;
  }, [saveData]);

  // Tweede vangnet, voor het einde van de lus.
  //
  // Het loop-attribuut hoort dit zelf te doen. WebKit deed het niet, en de
  // reden lag in het bestand: de bewerkingslijst schoof de weergave twee
  // beeldjes vooruit, waardoor de laatste tachtig milliseconden geen beeld
  // meer hadden. Dat is bij de hercodering rechtgezet en het loopt nu rond,
  // maar wij hebben dat toestel niet in handen, dus blijft er een grendel op.
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
