'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { zenchef } from '@/lib/site';

// De reserveerknop deed niets.
//
// De SDK van Zenchef leest zijn instellingen niet van zijn eigen script-tag
// maar van een div met de klasse zc-widget-config. Die stond er niet, dus de
// widget werd nooit opgebouwd: geen iframe, geen globale objecten, en elke
// link naar #zc-action-open sprong naar een anker dat niet bestaat. Dit is
// dezelfde opzet als op de bestaande site, waar hij wel werkt.
//
// De div moet er staan voordat het script laadt, vandaar afterInteractive en
// niet lazyOnload.
export function ZenchefLoader({ locale }: { locale: string }) {
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

  return (
    <>
      <div
        className="zc-widget-config"
        data-restaurant={zenchef.restaurantId}
        data-open=""
        data-primary-color={zenchef.primaryColor}
        data-lang={locale}
      />
      <Script id="zenchef-sdk" src={zenchef.sdk} strategy="afterInteractive" />
    </>
  );
}
