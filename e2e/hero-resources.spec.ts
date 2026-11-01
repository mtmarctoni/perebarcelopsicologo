import { expect, test } from "@playwright/test";

test("homepage preloads only its used sans font", async ({ page }) => {
  await page.goto("/", { waitUntil: "load" });
  await expect(page.locator('link[rel="preload"][as="font"]')).toHaveCount(1);
  const fonts = await page.evaluate(async () => {
    await document.fonts.ready;
    return [...document.fonts]
      .filter((font) => font.status === "loaded")
      .map((font) => font.family);
  });
  expect(fonts.some((font) => font.includes("Mono"))).toBe(false);
});

for (const width of [320, 390, 479, 480, 640, 768, 889, 890, 920, 968, 1024, 1280, 1439, 1440]) {
  test(`portrait resource sizing matches its ${width}px layout`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/", { waitUntil: "load" });
    const sizing = await page.locator('section img[fetchpriority="high"]').evaluate((image) => {
      if (!(image instanceof HTMLImageElement)) throw new Error("Expected portrait image");
      const slot = image.sizes.split(",").find((size) => {
        const condition = size.match(/\([^)]+\)/)?.[0];
        return !condition || matchMedia(condition).matches;
      });
      const length = slot?.trim().replace(/^\([^)]+\)\s*/, "") ?? "0px";
      const probe = document.createElement("div");
      probe.style.cssText = `position:absolute;visibility:hidden;width:${length}`;
      document.body.append(probe);
      const advertised = probe.getBoundingClientRect().width;
      probe.remove();
      return {
        advertised,
        actual: image.clientWidth,
        loaded: image.complete && image.naturalWidth > 0,
      };
    });
    expect(sizing.loaded).toBe(true);
    expect(Math.abs(sizing.advertised - sizing.actual)).toBeLessThanOrEqual(2.1);
  });
}
