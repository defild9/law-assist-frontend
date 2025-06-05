import { auth } from './libs/auth';

export default auth(req => {
  const { pathname, origin } = req.nextUrl;

  // If the user is not authenticated, redirect to /sign-in (unless already on /sign-in)
  if (!req.auth) {
    if (pathname !== '/sign-in') {
      return Response.redirect(new URL('/sign-in', origin));
    }
    // Allow access to /sign-in
    return;
  }

  // If email is not verified and the user is not on /verify-email, redirect to /check-email
  if (!req.auth.isEmailVerified && pathname !== '/verify-email') {
    return Response.redirect(new URL('/check-email', origin));
  }

  // If the user is already authenticated and they try to visit /sign-in, send them to /chat
  if (pathname === '/sign-in') {
    return Response.redirect(new URL('/chat', origin));
  }

  // Role-based restrictions:
  //    - “Lawyer or Admin” routes: only users with role 'lawyer' or 'admin' may access
  const lawyerOrAdminRoutes = ['/templates', '/feedbacks', '/bots', '/dashboard'];

  //    - “Admin-only” routes: only users with role 'admin' may access
  const adminOnlyRoutes = ['/users', '/lawyers', '/subscription-plans', '/subscriptions'];

  // If trying to hit a lawyer-or-admin route but role is neither 'lawyer' nor 'admin'
  if (
    lawyerOrAdminRoutes.some(route => pathname.startsWith(route)) &&
    !['lawyer', 'admin'].includes(req.auth.role)
  ) {
    return Response.redirect(new URL('/', origin));
  }

  // If trying to hit an admin-only route but role is not 'admin'
  if (adminOnlyRoutes.some(route => pathname.startsWith(route)) && req.auth.role !== 'admin') {
    return Response.redirect(new URL('/', origin));
  }
});

export const config = {
  matcher: [
    '/sign-in',
    '/chat/:path*',
    '/profile',
    '/verify-email',
    '/check-email',
    '/templates/:path*',
    '/feedbacks/:path*',
    '/bots/:path*',
    '/dashboard',
    '/users/:path*',
    '/lawyers/:path*',
    '/subscription-plans/:path*',
    '/subscriptions/:path*',
  ],
};
