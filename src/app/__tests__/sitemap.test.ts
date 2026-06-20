import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/site", () => ({
  isProduction: vi.fn(),
  getCanonicalUrl: vi.fn(),
}));

import sitemap from "@/app/sitemap";
import { getCanonicalUrl, isProduction } from "@/lib/site";

describe("sitemap.xml", () => {
  it("returns all routes on production", () => {
    vi.mocked(isProduction).mockReturnValue(true);
    vi.mocked(getCanonicalUrl).mockReturnValue("https://perebarcelopsicologo.com");

    const entries = sitemap();
    const urls = entries.map((e) => e.url);

    expect(urls).toContain("https://perebarcelopsicologo.com");
    expect(urls).toContain("https://perebarcelopsicologo.com/about");
    expect(urls).toContain("https://perebarcelopsicologo.com/contact");
    expect(urls).toContain("https://perebarcelopsicologo.com/privacy");
    expect(urls).toContain("https://perebarcelopsicologo.com/servicios");
  });

  it("has root route with priority 1", () => {
    vi.mocked(isProduction).mockReturnValue(true);
    vi.mocked(getCanonicalUrl).mockReturnValue("https://perebarcelopsicologo.com");

    const entries = sitemap();
    const root = entries.find((e) => e.url === "https://perebarcelopsicologo.com");
    expect(root?.priority).toBe(1);
  });

  it("has hreflang alternates for each route", () => {
    vi.mocked(isProduction).mockReturnValue(true);
    vi.mocked(getCanonicalUrl).mockReturnValue("https://perebarcelopsicologo.com");

    const entries = sitemap();
    for (const entry of entries) {
      expect(entry.alternates?.languages).toBeDefined();
      expect(entry.alternates?.languages).toHaveProperty("x-default");
      expect(entry.alternates?.languages).toHaveProperty("es");
      expect(entry.alternates?.languages).toHaveProperty("ca");
    }
  });

  it("has correct Catalan alternates", () => {
    vi.mocked(isProduction).mockReturnValue(true);
    vi.mocked(getCanonicalUrl).mockReturnValue("https://perebarcelopsicologo.com");

    const entries = sitemap();
    const about = entries.find((e) => e.url === "https://perebarcelopsicologo.com/about");
    expect(about?.alternates?.languages?.ca).toBe("https://perebarcelopsicologo.com/ca/about");
  });

  it("returns empty array on non-production", () => {
    vi.mocked(isProduction).mockReturnValue(false);

    const entries = sitemap();
    expect(entries).toEqual([]);
  });
});
