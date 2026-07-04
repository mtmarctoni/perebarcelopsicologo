import { beforeEach, describe, expect, it, vi } from "vitest";
import { buildDataAttrs } from "@/components/ui/Button";
import { trackEvent } from "@/lib/tracking";

describe("buildDataAttrs", () => {
  it("returns empty object when no tracking props are given", () => {
    expect(buildDataAttrs()).toEqual({});
  });

  it("emits data-track only when track is provided", () => {
    expect(buildDataAttrs("cta")).toEqual({ "data-track": "cta" });
  });

  it("emits location and label alongside track", () => {
    expect(buildDataAttrs("nav", "navbar", "Home")).toEqual({
      "data-track": "nav",
      "data-track-location": "navbar",
      "data-track-label": "Home",
    });
  });

  it("omits location and label when undefined", () => {
    expect(buildDataAttrs("cta", undefined, undefined)).toEqual({
      "data-track": "cta",
    });
  });

  it("emits track and location without label", () => {
    expect(buildDataAttrs("social", "footer")).toEqual({
      "data-track": "social",
      "data-track-location": "footer",
    });
  });
});

describe("trackEvent", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it("pushes the event onto window.dataLayer when present", () => {
    const dataLayer: unknown[] = [];
    vi.stubGlobal("window", { dataLayer });
    trackEvent({ event: "calendly_scheduled" });
    expect(dataLayer).toHaveLength(1);
    expect(dataLayer[0]).toEqual({ event: "calendly_scheduled" });
  });

  it("is a no-op when window is undefined", () => {
    expect(() => trackEvent({ event: "x" })).not.toThrow();
  });

  it("is a no-op when dataLayer is missing", () => {
    vi.stubGlobal("window", {});
    expect(() => trackEvent({ event: "x" })).not.toThrow();
  });
});
