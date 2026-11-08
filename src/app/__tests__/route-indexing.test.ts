import { describe, expect, it, vi } from "vitest";

vi.mock("@/config/server-env.config", () => ({
  serverEnv: { GOOGLE_SITE_VERIFICATION: undefined },
}));

// Future routes demonstrate that neither consumer needs page-specific logic.
vi.mock("@/config/routes", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/config/routes")>()),
  pageRoutes: [
    { path: "/future-public", indexable: true },
    { path: "/future-private", indexable: false },
  ],
}));

vi.mock("@/lib/site", () => ({
  isProduction: vi.fn().mockReturnValue(true),
  getCanonicalUrl: () => "https://perebarcelopsicologo.com",
  getRobotsMetadata: vi.fn().mockReturnValue({
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  }),
}));

import { createPageMetadata } from "@/app/metadata";
import sitemap from "@/app/sitemap";
import { getRobotsMetadata, isProduction } from "@/lib/site";

describe("shared route indexing policy", () => {
  it("includes a future public route in both sitemap locales", () => {
    expect(sitemap().map((entry) => entry.url)).toEqual([
      "https://perebarcelopsicologo.com/future-public",
      "https://perebarcelopsicologo.com/ca/future-public",
    ]);
  });

  it.each(["es", "ca"])("sets noindex for a future private route in %s", (locale) => {
    const metadata = createPageMetadata({
      path: "/future-private",
      title: "Private",
      description: "Private",
      locale,
    });
    expect(metadata.robots).toEqual({ index: false, follow: true });
  });

  it.each(["es", "ca"])("retains preview restrictions for a private route in %s", (locale) => {
    vi.mocked(getRobotsMetadata).mockReturnValueOnce({ index: false, follow: false });
    const metadata = createPageMetadata({
      path: "/future-private",
      title: "Private",
      description: "Private",
      locale,
    });
    expect(metadata.robots).toEqual({ index: false, follow: false });
  });

  it("does not list configured public routes on previews", () => {
    vi.mocked(isProduction).mockReturnValueOnce(false);
    expect(sitemap()).toEqual([]);
  });
});
