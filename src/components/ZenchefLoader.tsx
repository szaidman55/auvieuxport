'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { zenchef } from '@/lib/site';

// De reserveerknop deed niets.
//
// De SDK van Zenchef leest zijn instellingen niet van zijn eigen script-tag
// maar van een div met de klasse zc-widget-config. Die stond er niet, dus de
// widget werd nooit opgebouwd: geen iframe, geen globale objecten, en elke
// link naar #zc-action-open sprong naar een anker dat niet bestaat. Dit is
// dezelfde opzet als op de bestaande site, waar hij wel werkt.
//
// De div staat er daarom altijd, ook voordat het script geladen is.
//
// ---------------------------------------------------------------------------
// Waarom het script pas laadt als iemand ernaar reikt
// ---------------------------------------------------------------------------
// Hij laadde op elke pagina, bij elke bezoeker, of die nu wilde reserveren of
// niet. Nagemeten wat dat kost: sdk.min.js 6,0 kB en sdk.css 0,6 kB, en
// daarachter de iframe van 53,6 kB die er 1,76 s over deed. Die iframe doet
// vervolgens haar eigen werk - 41 verzoeken naar vijf domeinen, waaronder de
// captcha-dienst van AWS - en zet een aws-waf-token en vier sleutels in
// localStorage, waarvan twee voor een dienst die alleen hun eigen
// functievlaggen bijhoudt.
//
// Dat is een derde partij die iets op het toestel van de bezoeker zet voordat
// die om iets gevraagd heeft, op een site die er juist voor gebouwd is om dat
// niet te doen. Het laadt nu pas wanneer iemand naar een reserveerknop reikt.
//
// Reiken is: de muis erover, de toetsenbordfocus erop, of een vinger die hem
// raakt. Alle drie gaan ze vooraf aan de klik, dus op een muis en op een
// toetsenbord staat het venster klaar tegen de tijd dat de klik komt.
//
// Wie sneller klikt dan de SDK laadt, verliest niets: BookLink is een echte
// link naar de reserveerpagina en houdt de klik alleen tegen wanneer de
// iframe er werkelijk staat. Dan gaat de bezoeker gewoon naar de
// boekingspagina van Zenchef. Dat vangnet stond er al.
//
// Op een telefoon is dat het waarschijnlijke pad: tussen de aanraking en de
// klik zit geen 1,76 s. Daar wordt de overlay dus een paginawissel. De
// reservatie werkt, ze ziet er alleen anders uit.
const REIKEN = ['pointerover', 'focusin', 'touchstart'] as const;

export function ZenchefLoader({ locale }: { locale: string }) {
  const [gevraagd, setGevraagd] = useState(false);

  useEffect(() => {
    // De iframe van Zenchef draagt geen title, dus een schermlezer kondigt
    // een naamloos kader aan waar de hele reservatie in zit.
    const title =
      locale === 'fr'
        ? 'Réservation en ligne - Au Vieux Port'
        : locale === 'en'
          ? 'Online booking - Au Vieux Port'
          : 'Online reserveren - Au Vieux Port';

    const observer = new MutationObserver(() => {
      document
        .querySelectorAll<HTMLIFrameElement>('iframe[src*="zenchef"]')
        .forEach((frame) => {
          if (!frame.title) frame.title = title;
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [locale]);

  useEffect(() => {
    if (gevraagd) return;

    // pointerenter en focus bubbelen niet; pointerover en focusin wel. Anders
    // zou een luisteraar op document ze nooit zien.
    const reik = (event: Event) => {
      const doel = event.target;
      if (doel instanceof Element && doel.closest('[data-zc-action]')) {
        setGevraagd(true);
      }
    };

    REIKEN.forEach((soort) =>
      document.addEventListener(soort, reik, { passive: true }),
    );
    return () =>
      REIKEN.forEach((soort) => document.removeEventListener(soort, reik));
  }, [gevraagd]);

  return (
    <>
      {/* Geen zwevende knop van Zenchef.

          De SDK legt uit zichzelf een gouden pil rechtsonder, met haar eigen
          tekst in de taal van het restaurant: op de Franse pagina stond daar
          "Reserveer een tafel". Ze lag boven op onze eigen balk onderaan, dus
          een telefoon toonde twee reserveerknoppen over elkaar, in twee talen.

          data-hide-default-button leest de SDK op aanwezigheid, niet op
          waarde: staat het attribuut er, dan blijft de pil weg. Onze eigen
          knoppen openen het venster nog altijd via de ankerlink. */}
      <div
        className="zc-widget-config"
        data-restaurant={zenchef.restaurantId}
        data-hide-default-button=""
        data-open="false"
        data-primary-color={zenchef.primaryColor}
        data-lang={locale}
      />
      {gevraagd && (
        <Script id="zenchef-sdk" src={zenchef.sdk} strategy="afterInteractive" />
      )}
    </>
  );
}
