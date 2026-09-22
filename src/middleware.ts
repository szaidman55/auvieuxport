import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Alles behalve api, admin, next-interne routes en bestanden met een punt.
  matcher: ['/((?!api|admin|_next|_vercel|.*\..*).*)'],
};
