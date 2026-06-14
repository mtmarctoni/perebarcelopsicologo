export const navRoutes = [
  { href: "/" as const, labelKey: "home" as const },
  { href: "/about" as const, labelKey: "about" as const },
  { href: "/servicios" as const, labelKey: "servicios" as const },
  { href: "/contact" as const, labelKey: "contact" as const },
] as const;

export const sitemapRoutes = ["", "/about", "/contact", "/privacy", "/servicios"] as const;
