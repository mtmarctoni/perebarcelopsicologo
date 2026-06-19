import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

const OriginalEnv = process.env;

describe("client-env.config", () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...OriginalEnv };
  });

  afterAll(() => {
    process.env = OriginalEnv;
  });

  it("parses all optional fields when present", async () => {
    process.env.NEXT_PUBLIC_CALENDLY_URL = "https://calendly.com/test";
    process.env.NEXT_PUBLIC_GTM_ID = "GTM-XXXXX";
    process.env.NEXT_PUBLIC_COOKIEBOT_CBID = "cbid-123";

    const { clientEnv } = await import("./client-env.config");
    expect(clientEnv.NEXT_PUBLIC_CALENDLY_URL).toBe("https://calendly.com/test");
    expect(clientEnv.NEXT_PUBLIC_GTM_ID).toBe("GTM-XXXXX");
    expect(clientEnv.NEXT_PUBLIC_COOKIEBOT_CBID).toBe("cbid-123");
  });

  it("defaults optional fields to undefined when absent", async () => {
    delete process.env.NEXT_PUBLIC_CALENDLY_URL;
    delete process.env.NEXT_PUBLIC_GTM_ID;
    delete process.env.NEXT_PUBLIC_COOKIEBOT_CBID;

    const { clientEnv } = await import("./client-env.config");
    expect(clientEnv.NEXT_PUBLIC_CALENDLY_URL).toBeUndefined();
    expect(clientEnv.NEXT_PUBLIC_GTM_ID).toBeUndefined();
    expect(clientEnv.NEXT_PUBLIC_COOKIEBOT_CBID).toBeUndefined();
  });

  it("trims whitespace from values", async () => {
    process.env.NEXT_PUBLIC_CALENDLY_URL = "  https://calendly.com/test  ";

    const { clientEnv } = await import("./client-env.config");
    expect(clientEnv.NEXT_PUBLIC_CALENDLY_URL).toBe("https://calendly.com/test");
  });
});
