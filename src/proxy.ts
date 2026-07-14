import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { buildContentSecurityPolicy } from "../config/content-security-policy";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const STAGING_HOST = process.env.STAGING_HOST || "app.perebarcelopsicologo.com";

function normalizeHost(value: string): string {
  return value.split(":")[0].toLowerCase();
}

function isStaging(request: NextRequest): boolean {
  const hostHeader = request.headers.get("host") || request.nextUrl.host;
  const host = normalizeHost(hostHeader);
  const stagingHost = normalizeHost(STAGING_HOST);

  return host === stagingHost || host.endsWith(`.${stagingHost}`);
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

/**
 * Generate a per-request nonce and attach the CSP header to the response.
 *
 * Next.js reads the nonce from the CSP response header and auto-applies it
 * to every inline script it injects (hydration, flight data) and to all
 * `next/script` components (GTM, Cookiebot). No manual nonce passing needed.
 *
 * Staging uses Content-Security-Policy-Report-Only so violations are logged
 * to the console without breaking the page — useful for testing CSP changes
 * before they reach production.
 */
function withCsp(request: NextRequest, response: NextResponse): NextResponse {
  const isDev = process.env.NODE_ENV === "development";
  const staging = isStaging(request);
  const nonce = btoa(crypto.randomUUID());

  const csp = buildContentSecurityPolicy({ nonce, isDev });

  const headerName =
    staging && !isDev ? "Content-Security-Policy-Report-Only" : "Content-Security-Policy";

  response.headers.set(headerName, csp);
  return response;
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
        const response = intlMiddleware(request);
        response.headers.set("X-Robots-Tag", "noindex, nofollow");
        return withCsp(request, response);
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

    // HTTP -> HTTPS redirect only on Vercel production
    if (process.env.VERCEL_ENV === "production") {
      const proto = request.headers.get("x-forwarded-proto");
      if (proto === "http") {
        return NextResponse.redirect(new URL(url.toString().replace("http://", "https://")));
      }
    }
  }

  // === INTL MIDDLEWARE ===
  const response = intlMiddleware(request);
  return withCsp(request, response);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
