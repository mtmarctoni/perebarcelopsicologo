import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Handle www to non-www redirect
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || 'perebarcelopsicologo.com';
  
  if (hostname.startsWith('www.')) {
    const newHostname = hostname.replace('www.', '');
    return NextResponse.redirect(
      new URL(`${url.pathname}${url.search}`, `https://${newHostname}`)
    );
  }
  
  // Handle HTTP to HTTPS redirect (only in production)
  if (process.env.NODE_ENV === 'production') {
    const proto = request.headers.get('x-forwarded-proto');
    if (proto === 'http') {
      return NextResponse.redirect(
        new URL(url.toString().replace('http://', 'https://'))
      );
    }
  }
  
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sitemap.xml (sitemap)
     * - robots.txt (robots file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
