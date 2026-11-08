export const navRoutes = [
  { href: "/" as const, labelKey: "home" as const },
  { href: "/about" as const, labelKey: "about" as const },
  { href: "/servicios" as const, labelKey: "servicios" as const },
  { href: "/contact" as const, labelKey: "contact" as const },
] as const;

// Shared by page robots metadata and the sitemap. Paths are locale-independent.
// Add new pages here; indexable: false keeps them crawlable but out of search.
export const pageRoutes = [
  { path: "/", indexable: true },
  { path: "/about", indexable: true },
  { path: "/contact", indexable: true },
  { path: "/privacy", indexable: false },
  { path: "/servicios", indexable: true },
] as const;
