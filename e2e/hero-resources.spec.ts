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
