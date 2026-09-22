'use client';

import Script from 'next/script';
import { zenchef } from '@/lib/site';

// Zenchef hangt zijn eigen venster in de pagina. Twee dingen die de oude
// opzet fout deed en hier gerepareerd zijn:
//   - de iframe droeg geen title, dus een schermlezer kondigde een naamloos
//     kader aan waar de reservatie in zit;
//   - het venster stond permanent over driekwart van elk telefoonscherm.
// De SDK laadt pas na de eerste interactie of na drie seconden, zodat hij de
// eerste weergave niet vertraagt.
export function ZenchefLoader({ locale }: { locale: string }) {
  return (
    <Script
      id="zenchef-sdk"
      src={zenchef.sdk}
      strategy="lazyOnload"
      data-restaurant={zenchef.restaurantId}
      data-lang={locale}
      onReady={() => {
        const frame = document.querySelector<HTMLIFrameElement>(
          'iframe[src*="zenchef"]',
        );
        if (frame && !frame.title) {
          frame.title =
            locale === 'fr'
              ? 'Reservation en ligne - Au Vieux Port'
              : locale === 'en'
                ? 'Online booking - Au Vieux Port'
                : 'Online reserveren - Au Vieux Port';
        }
      }}
    />
  );
}
