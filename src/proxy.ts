import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const STAGING_HOST = process.env.STAGING_HOST || "app.perebarcelopsicologo.com";

function isStaging(request: NextRequest): boolean {
  const host = request.headers.get("host") || request.nextUrl.host;
  return host.includes(STAGING_HOST);
}

function getUnauthorizedResponse(): NextResponse {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Staging Environment"',
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") || request.nextUrl.host;
  const url = request.nextUrl;

  // === STAGING PROTECTION ===
  if (isStaging(request)) {
    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Basic ")) {
      return getUnauthorizedResponse();
    }

    try {
      const credentials = atob(authHeader.split(" ")[1]);
      const [username, password] = credentials.split(":");

      const expectedUsername = process.env.STAGING_USERNAME;
      const expectedPassword = process.env.STAGING_PASSWORD;

      if (
        expectedUsername &&
        expectedPassword &&
        username === expectedUsername &&
        password === expectedPassword
      ) {
        const response = NextResponse.next();
        response.headers.set("X-Robots-Tag", "noindex, nofollow");
        return response;
      }
    } catch {
      // Malformed auth header
    }

    return getUnauthorizedResponse();
  }

  // === PRODUCTION REDIRECTS ===
  // Skip API routes and static files for redirect logic
  const pathname = url.pathname;
  const isSkippedPath =
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next/static") ||
    pathname.startsWith("/_next/image") ||
    pathname === "/favicon.ico" ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt";

  if (!isSkippedPath) {
    // www → non-www redirect
    if (host.startsWith("www.")) {
      const newHostname = host.replace("www.", "");
      return NextResponse.redirect(
        new URL(`${url.pathname}${url.search}`, `https://${newHostname}`),
      );
    }

    // HTTP → HTTPS redirect in production
    if (process.env.NODE_ENV === "production") {
      const proto = request.headers.get("x-forwarded-proto");
      if (proto === "http") {
        return NextResponse.redirect(new URL(url.toString().replace("http://", "https://")));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
