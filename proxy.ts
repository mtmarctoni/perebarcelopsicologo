import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

const intlMiddleware = createMiddleware(routing);

const STAGING_HOST = process.env.STAGING_HOST || "app.perebarcelopsicologo.com";

function isStaging(request: NextRequest): boolean {
  const rawHost = request.headers.get("host") || request.nextUrl.host;
  const normalizeHost = (value: string): string =>
    value.split(":")[0].toLowerCase().replace(/\.$/, "");

  const host = normalizeHost(rawHost);
  const stagingHost = normalizeHost(STAGING_HOST);

  return host === stagingHost;
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
  const pathname = url.pathname;

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
  const isSkippedPath =
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next/static") ||
    pathname.startsWith("/_next/image") ||
    pathname === "/favicon.ico" ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt";

  if (!isSkippedPath) {
    // www -> non-www redirect
    if (host.startsWith("www.")) {
      const newHostname = host.replace("www.", "");
      return NextResponse.redirect(
        new URL(`${url.pathname}${url.search}`, `https://${newHostname}`),
      );
    }

    // HTTP -> HTTPS redirect in production
    if (process.env.NODE_ENV === "production") {
      const proto = request.headers.get("x-forwarded-proto");
      if (proto === "http") {
        return NextResponse.redirect(new URL(url.toString().replace("http://", "https://")));
      }
    }
  }

  // === INTL MIDDLEWARE ===
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
