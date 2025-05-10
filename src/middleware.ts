import { auth } from './libs/auth';

export default auth(req => {
  // It's need for redirect user to check email page if he is not verified
  if (req.auth && !req.auth.isEmailVerified && req.nextUrl.pathname !== '/verify-email') {
    return Response.redirect(new URL('/check-email', req.nextUrl.origin));
  }
  // It's need for redirect user to chat page if he is already authenticated
  if (req.auth && req.nextUrl.pathname === '/sign-in') {
    return Response.redirect(new URL('/chat', req.nextUrl.origin));
  }

  // It's need for redirect user to login page if he is not authenticated
  if (!req.auth && req.nextUrl.pathname !== '/sign-in') {
    const newUrl = new URL('/sign-in', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ['/sign-in', '/chat/:path*', '/profile'],
};
