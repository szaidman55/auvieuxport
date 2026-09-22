'use client';

import { zenchef } from '@/lib/site';

/**
 * Het reserveergedrag, zonder vormgeving.
 *
 * Elke plek die naar de reservatie verwijst gebruikt dit, zodat er maar één
 * plaats is waar staat hoe het venster opengaat - en zodat de balk onderaan
 * niet stilletjes een andere manier kan gaan gebruiken dan de knoppen in de
 * pagina. Waarom het niet meer via de hash loopt, staat in BookButton.
 */
export function BookLink({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={zenchef.bookingUrl}
      data-zc-action="open"
      onClick={(event) => {
        // Alleen op de site houden als het venster er echt is om het over te
        // nemen. Niet afgaan op een globale variabele van de SDK: hoe die
        // heet is nergens vastgelegd en kan bij hen veranderen. De iframe is
        // het bewijs zelf - staat die er, dan is de widget opgebouwd en vangt
        // haar eigen klikluisteraar deze klik op. Staat die er niet, dan laten
        // we de link gewoon doen waar hij voor staat.
        if (document.querySelector('iframe[src*="zenchef"]')) {
          event.preventDefault();
        }
      }}
      className={className}
    >
      {children}
    </a>
  );
}
