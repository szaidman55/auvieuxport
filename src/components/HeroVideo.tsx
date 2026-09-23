'use client';

import { useEffect, useRef, useState } from 'react';

// De zaal in beweging, achter de belofte.
//
// Drie dingen die dit anders maken dan de video van YouTube die hier vroeger
// stond:
//
// Hij staat op onze eigen server. Geen enkel verzoek gaat naar een derde, dus
// er worden geen cookies gezet en er is geen toestemmingsbalk nodig. Dat was
// de hele reden om hem zelf te hosten.
//
// Een telefoon haalt hem niet op. De bronnen worden pas gezet wanneer het
// scherm breed genoeg is om er iets aan te hebben; daaronder blijft het bij de
// posterafbeelding van 52 kB. Een loop van 1,8 MB op een gsm kost data en
// levert op dat formaat bijna niets op.
//
// Wie bewegende beelden liever vermijdt, krijgt ze niet. prefers-reduced-motion
// is geen randgeval: draaiende achtergronden maken sommige mensen misselijk.
export function HeroVideo({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const wideEnough = window.matchMedia('(min-width: 640px)');
    const stillness = window.matchMedia('(prefers-reduced-motion: reduce)');

    const decide = () => setArmed(wideEnough.matches && !stillness.matches);

    decide();
    wideEnough.addEventListener('change', decide);
    stillness.addEventListener('change', decide);
    return () => {
      wideEnough.removeEventListener('change', decide);
      stillness.removeEventListener('change', decide);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !armed) return;
    // load() is nodig omdat de bronnen er bij de eerste render nog niet waren.
    el.load();
    // Een browser mag autoplay weigeren. Dat is geen fout om te melden: de
    // poster staat er al en dat is precies wat een bezoeker dan ziet.
    void el.play().catch(() => {});
  }, [armed]);

  return (
    <video
      ref={ref}
      poster="/img/hero-poster.webp"
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      className={className}
    >
      {armed && <source src="/video/hero.webm" type="video/webm" />}
      {armed && <source src="/video/hero.mp4" type="video/mp4" />}
    </video>
  );
}
