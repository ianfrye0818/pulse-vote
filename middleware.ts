import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { env } from './env';

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req))
    auth().protect({
      unauthenticatedUrl: env.BASE_URL + '/sign-in',
    });
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

const isProtectedRoute = createRouteMatcher(['/get-rooms', '/add-room']);
