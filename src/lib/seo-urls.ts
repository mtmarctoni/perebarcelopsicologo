/** Match Next.js's default, non-trailing-slash page URLs. */
export function getLocalizedPageUrl(baseUrl: string, path: string, locale: string): string {
  const route = path.replace(/\/+$/, "");
  const prefix = locale === "es" ? "" : `/${locale}`;
  return `${baseUrl.replace(/\/+$/, "")}${prefix}${route}`;
}

export function getPageAlternates(baseUrl: string, path: string): Record<string, string> {
  const es = getLocalizedPageUrl(baseUrl, path, "es");
  return {
    "x-default": es,
    es,
    ca: getLocalizedPageUrl(baseUrl, path, "ca"),
  };
}
