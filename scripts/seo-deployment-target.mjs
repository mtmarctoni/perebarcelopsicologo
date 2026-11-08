const productionUrl = "https://perebarcelopsicologo.com/";

/** @param {string} deploymentUrl */
export function resolveAuditUrl(deploymentUrl) {
  const url = new URL(deploymentUrl);
  const allowedHost =
    url.hostname === "perebarcelopsicologo.com" ||
    /^perebarcelopsicologo-[a-z0-9]+-mtmarctonis-projects\.vercel\.app$/.test(url.hostname);
  if (
    url.protocol !== "https:" ||
    !allowedHost ||
    url.port ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error("Unexpected deployment URL");
  }
  // Immutable Vercel URLs require authentication. Measure the public site instead,
  // without claiming its mutable alias proves the event's exact commit is served.
  return productionUrl;
}

export async function verifyAuditPage() {
  const response = await fetch(productionUrl, {
    redirect: "manual",
    signal: AbortSignal.timeout(30_000),
  });
  if (response.status !== 200)
    throw new Error("Expected public production HTTP 200 without redirects");
  if (/noindex|none/i.test(response.headers.get("x-robots-tag") || "")) {
    throw new Error("Expected an indexable public production page");
  }
  const html = await response.text();
  if (
    !response.headers.get("content-type")?.includes("text/html") ||
    !/<link\b[^>]*rel="canonical"[^>]*href="https:\/\/perebarcelopsicologo\.com\/?"/.test(html)
  ) {
    throw new Error("Expected production HTML with its public canonical");
  }
}
