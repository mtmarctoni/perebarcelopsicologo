import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/site", () => ({
  isProduction: vi.fn(),
  getCanonicalUrl: vi.fn().mockReturnValue("https://perebarcelopsicologo.com"),
  getRobotsMetadata: vi.fn().mockReturnValue({ index: true, follow: true }),
}));

vi.mock("@/config/server-env.config", () => ({ serverEnv: {} }));

import { createPageMetadata } from "@/app/metadata";
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
    expect(urls).toHaveLength(10);
    expect(new Set(urls).size).toBe(10);
    for (const path of ["", "/about", "/contact", "/privacy", "/servicios"]) {
      expect(urls).toContain(`https://perebarcelopsicologo.com/ca${path}`);
    }
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

  it("has reciprocal alternates with matching canonical sitemap entries", () => {
    vi.mocked(isProduction).mockReturnValue(true);
    vi.mocked(getCanonicalUrl).mockReturnValue("https://perebarcelopsicologo.com");
    const entries = sitemap();
    for (const entry of entries) {
      expect(entry.lastModified).toBeUndefined();
      for (const locale of ["es", "ca"] as const) {
        const url = entry.alternates?.languages?.[locale];
        const alternate = entries.find((candidate) => candidate.url === url);
        expect(alternate?.alternates).toEqual(entry.alternates);
      }
    }
    for (const path of ["/", "/about", "/contact", "/privacy", "/servicios"]) {
      for (const locale of ["es", "ca"]) {
        const metadata = createPageMetadata({ title: "Test", description: "Test", path, locale });
        const entry = entries.find((candidate) => candidate.url === metadata.alternates?.canonical);
        expect(entry).toBeDefined();
        expect(entry?.alternates?.languages).toEqual(metadata.alternates?.languages);
      }
    }
  });
});
