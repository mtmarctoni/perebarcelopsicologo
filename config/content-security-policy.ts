/**
 * Build the Content-Security-Policy header value.
 *
 * ## Environment behavior
 * - **Production** (`VERCEL_ENV === "production"`): strict enforces.
 * - **Preview / staging** (`VERCEL_ENV === "preview"`): same policy but
 *   emitted as `Content-Security-Policy-Report-Only` so violations are
 *   logged without breaking the page — lets us test policy changes
 *   safely before they reach production.
 * - **Local dev** (`NODE_ENV === "development"`): adds `'unsafe-eval'`
 *   (HMR / source maps) and Vercel Live toolbar origins.
 */

export type CspOptions = {
  isDev?: boolean;
};

const isVercelPreview = process.env.VERCEL_ENV === "preview";
const isVercelProduction = process.env.VERCEL_ENV === "production";
export const cspReportOnly = !isVercelProduction;

// CSP token constants — typo-proof.
const SELF = "'self'" as const;
const NONE = "'none'" as const;
const UNSAFE_INLINE = "'unsafe-inline'" as const;
const UNSAFE_EVAL = "'unsafe-eval'" as const;

type DirectiveKey = "script" | "style" | "img" | "font" | "connect" | "frame";

type ServiceOrigins = Partial<Record<DirectiveKey, string[]>>;

const services: Record<string, ServiceOrigins> = {
  gtm: {
    script: ["https://www.googletagmanager.com"],
    style: ["https://www.googletagmanager.com", "https://fonts.googleapis.com"],
    img: ["https://www.googletagmanager.com", "https://fonts.gstatic.com"],
    font: ["https://fonts.gstatic.com"],
    connect: ["https://www.googletagmanager.com"],
    frame: ["https://www.googletagmanager.com"],
  },
  ga4: {
    script: [
      "https://www.googletag.com",
      "https://www.google-analytics.com",
      "https://ssl.google-analytics.com",
    ],
    img: [
      "https://www.googletag.com",
      "https://www.google-analytics.com",
      "https://ssl.google-analytics.com",
    ],
    connect: ["https://www.googletag.com", "https://*.google-analytics.com"],
    frame: ["https://www.google-analytics.com"],
  },
  googleAds: {
    script: [
      "https://www.googleadservices.com",
      "https://googleads.g.doubleclick.net",
      "https://pagead2.googlesyndication.com",
    ],
    img: [
      "https://www.googleadservices.com",
      "https://googleads.g.doubleclick.net",
      "https://www.google.com",
      "https://pagead2.googlesyndication.com",
    ],
    connect: ["https://googleads.g.doubleclick.net", "https://pagead2.googlesyndication.com"],
    frame: [
      "https://www.googleadservices.com",
      "https://googleads.g.doubleclick.net",
      "https://www.google.com",
    ],
  },
  calendly: {
    img: ["https://*.calendly.com"],
    connect: ["https://*.calendly.com"],
    frame: ["https://calendly.com", "https://*.calendly.com"],
  },
};

const vercelLive: ServiceOrigins = {
  script: ["https://vercel.live"],
  style: ["https://vercel.live"],
  img: ["https://vercel.live", "https://vercel.com"],
  font: ["https://vercel.live", "https://assets.vercel.com"],
  connect: ["https://vercel.live", "wss://ws-us3.pusher.com", "https://*.pusher.com"],
  frame: ["https://vercel.live"],
};

function collect(directive: DirectiveKey, envOrigins: ServiceOrigins = {}): string[] {
  return [...Object.values(services), envOrigins].flatMap((s) => s[directive] ?? []);
}

/**
 * Build the CSP directive string (the value to put in the
 * `Content-Security-Policy` / `Content-Security-Policy-Report-Only` header).
 */
export function buildContentSecurityPolicy({ isDev = false }: CspOptions = {}): string {
  // Vercel auto-injects its Live Feedback toolbar on preview / dev
  // deployments — allow those origins anywhere except production so the
  // toolbar doesn't trip the CSP and pollute the console (which fails
  // Lighthouse best-practices).
  const allowVercelLive = isDev || isVercelPreview;

  const envOrigins: ServiceOrigins = allowVercelLive ? vercelLive : {};

  // script-src: 'self' + 'unsafe-inline' (unavoidable without nonce).
  // Dev adds 'unsafe-eval' for HMR / source maps.
  const scriptSrc: string[] = [SELF, UNSAFE_INLINE];
  if (isDev) scriptSrc.push(UNSAFE_EVAL);
  scriptSrc.push(...collect("script", envOrigins));

  // style-src: always 'unsafe-inline' — Next.js injects inline styles
  // (next/font, styled-jsx, Tailwind utilities). The XSS risk of inline
  // CSS is far lower than inline JS.
  const styleSrc: string[] = [SELF, UNSAFE_INLINE, ...collect("style", envOrigins)];

  const directives: Record<string, string[]> = {
    "default-src": [SELF],
    "script-src": scriptSrc,
    "style-src": styleSrc,
    "img-src": [SELF, "data:", "blob:", ...collect("img", envOrigins)],
    "font-src": [SELF, ...collect("font", envOrigins)],
    "connect-src": [SELF, ...collect("connect", envOrigins)],
    "frame-src": [SELF, ...collect("frame", envOrigins)],
    "frame-ancestors": [NONE],
    "base-uri": [SELF],
    "form-action": [SELF],
    "object-src": [NONE],
  };

  return Object.entries(directives)
    .map(([directive, values]) => `${directive} ${values.join(" ")}`)
    .join("; ");
}
