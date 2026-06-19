import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

const OriginalEnv = process.env;

describe("server-env.config", () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...OriginalEnv };
  });

  afterAll(() => {
    process.env = OriginalEnv;
  });

  it("parses valid server environment", async () => {
    process.env.RESEND_API_KEY = "re_abc123";
    process.env.PORT = "3000";

    const { serverEnv } = await import("./server-env.config");
    expect(serverEnv.RESEND_API_KEY).toBe("re_abc123");
    expect(serverEnv.PORT).toBe(3000);
    expect(serverEnv.GOOGLE_SITE_VERIFICATION).toBeUndefined();
    expect(serverEnv.STAGING_HOST).toBeUndefined();
  });

  it("uses default port 3000 when PORT is not set", async () => {
    process.env.RESEND_API_KEY = "re_abc123";

    const { serverEnv } = await import("./server-env.config");
    expect(serverEnv.PORT).toBe(3000);
  });

  it("coerces PORT from string to number", async () => {
    process.env.RESEND_API_KEY = "re_abc123";
    process.env.PORT = "8080";

    const { serverEnv } = await import("./server-env.config");
    expect(serverEnv.PORT).toBe(8080);
  });

  it("throws when RESEND_API_KEY is missing", async () => {
    delete process.env.RESEND_API_KEY;

    await expect(import("./server-env.config")).rejects.toThrow(
      "Invalid server environment variables",
    );
  });

  it("throws when RESEND_API_KEY is empty string", async () => {
    process.env.RESEND_API_KEY = "";

    await expect(import("./server-env.config")).rejects.toThrow(
      "Invalid server environment variables",
    );
  });

  it("parses optional GOOGLE_SITE_VERIFICATION and STAGING_HOST", async () => {
    process.env.RESEND_API_KEY = "re_abc123";
    process.env.GOOGLE_SITE_VERIFICATION = "google-verify-123";
    process.env.STAGING_HOST = "app.perebarcelopsicologo.com";

    const { serverEnv } = await import("./server-env.config");
    expect(serverEnv.GOOGLE_SITE_VERIFICATION).toBe("google-verify-123");
    expect(serverEnv.STAGING_HOST).toBe("app.perebarcelopsicologo.com");
  });

  it("trims whitespace from GOOGLE_SITE_VERIFICATION", async () => {
    process.env.RESEND_API_KEY = "re_abc123";
    process.env.GOOGLE_SITE_VERIFICATION = "  verify-123  ";

    const { serverEnv } = await import("./server-env.config");
    expect(serverEnv.GOOGLE_SITE_VERIFICATION).toBe("verify-123");
  });
});
