import { afterEach, describe, expect, it, vi } from "vitest";
import { resolveAuditUrl, verifyAuditPage } from "../../../scripts/seo-deployment-target.mjs";

afterEach(() => vi.unstubAllGlobals());

describe("post-deployment SEO audit target", () => {
  it("audits the public production origin instead of the protected deployment URL", () => {
    expect(
      resolveAuditUrl("https://perebarcelopsicologo-69aq4hoq1-mtmarctonis-projects.vercel.app"),
    ).toBe("https://perebarcelopsicologo.com/");
    expect(resolveAuditUrl("https://perebarcelopsicologo.com/")).toBe(
      "https://perebarcelopsicologo.com/",
    );
  });

  it.each([
    "https://unrelated-project.vercel.app",
    "https://perebarcelopsicologo-abc-another-team.vercel.app",
    "https://perebarcelopsicologo.com.attacker.test",
    "http://perebarcelopsicologo.com",
    "https://user:password@perebarcelopsicologo.com",
    "https://perebarcelopsicologo.com/login",
    "https://perebarcelopsicologo.com/?token=secret",
  ])("rejects an unexpected deployment source: %s", (url) => {
    expect(() => resolveAuditUrl(url)).toThrow();
  });

  it("rejects authentication redirects instead of following them", async () => {
    const fetch = vi.fn().mockResolvedValue(
      new Response(null, {
        status: 302,
        headers: { location: "https://vercel.com/login" },
      }),
    );
    vi.stubGlobal("fetch", fetch);
    await expect(verifyAuditPage()).rejects.toThrow("200");
    expect(fetch).toHaveBeenCalledWith(
      "https://perebarcelopsicologo.com/",
      expect.objectContaining({ redirect: "manual" }),
    );
  });

  it("rejects noindex pages and unrelated HTML", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response("Login", {
          headers: { "content-type": "text/html", "x-robots-tag": "noindex" },
        }),
      ),
    );
    await expect(verifyAuditPage()).rejects.toThrow("indexable");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response("Login", {
          headers: { "content-type": "text/html" },
        }),
      ),
    );
    await expect(verifyAuditPage()).rejects.toThrow("canonical");
  });

  it("accepts the public site's HTML with its production canonical", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          new Response(
            '<html><head><link rel="canonical" href="https://perebarcelopsicologo.com"/></head></html>',
            { headers: { "content-type": "text/html" } },
          ),
        ),
    );
    await expect(verifyAuditPage()).resolves.toBeUndefined();
  });
});
