import { expect, test } from "@playwright/test";

test.use({ javaScriptEnabled: false });

for (const locale of ["es", "ca"]) {
  test(`${locale} hero content is visible without client JavaScript`, async ({ page }) => {
    await page.goto(`/${locale}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toBeVisible();
    const portrait = page.locator('section img[fetchpriority="high"]');
    await expect(portrait).toBeVisible();
    await expect
      .poll(() =>
        portrait.evaluate(
          (image) => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0,
        ),
      )
      .toBe(true);
  });
}
