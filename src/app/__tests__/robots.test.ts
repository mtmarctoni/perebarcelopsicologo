import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/site", () => ({
  isProduction: vi.fn(),
  getSiteUrl: vi.fn(),
}));

import robots from "@/app/robots";
import { getSiteUrl, isProduction } from "@/lib/site";

describe("robots.txt", () => {
  it("allows all robots on production with sitemap link", () => {
    vi.mocked(isProduction).mockReturnValue(true);
    vi.mocked(getSiteUrl).mockReturnValue("https://perebarcelopsicologo.com");

    const result = robots();
    expect(result).toEqual({
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      sitemap: "https://perebarcelopsicologo.com/sitemap.xml",
    });
  });

  it("disallows all robots on non-production environments", () => {
    vi.mocked(isProduction).mockReturnValue(false);

    const result = robots();
    expect(result).toEqual({
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    });
  });
});
