import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Alles behalve api, admin, next-interne routes en bestanden met een punt.
  //
  // De punt moet hier dubbel ontsnapt: dit is een string die als regex wordt
  // gelezen, en '\.' in een gewone string is gewoon '.'. Met een enkele
  // backslash werd het patroon '.*..*', dat op bijna elk pad past, zodat de
  // lookahead alles uitsloot en deze middleware nooit liep. Daardoor gaf
  // /ons-team een 404 en bleven /en/wine-list en /fr/carte-des-vins onbekend.
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)'],
};
