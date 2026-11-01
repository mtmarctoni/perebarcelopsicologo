import { expect, test } from "@playwright/test";

test.use({ javaScriptEnabled: false });

test("hero stays opaque while its CSS entrance runs without JavaScript", async ({ page }) => {
  await page.goto("/es", { waitUntil: "domcontentloaded" });
  const entrance = page.locator('[data-reveal="load"]').first();
  await expect(entrance).toBeVisible();
  await expect(entrance).toHaveCSS("opacity", "1");
  await expect(entrance).toHaveCSS("animation-name", "reveal-load");
  await expect(page.locator("h1")).toBeVisible();
});

test("scroll reveals run from CSS view timelines without JavaScript", async ({ page }) => {
  await page.goto("/es", { waitUntil: "domcontentloaded" });
  expect(await page.evaluate(() => CSS.supports("animation-timeline", "view()"))).toBe(true);
  const reveal = page.locator('[data-reveal="scroll"]').first();
  await expect(reveal).toHaveCSS("animation-name", "reveal-scroll");
  await reveal.scrollIntoViewIfNeeded();
  await expect(reveal).toHaveCSS("opacity", "1");
});

test("reduced motion leaves load and scrolled content static and visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/es", { waitUntil: "domcontentloaded" });
  for (const trigger of ["load", "scroll"]) {
    const reveal = page.locator(`[data-reveal="${trigger}"]`).first();
    await expect(reveal).toHaveCSS("animation-name", "none");
    await expect(reveal).toHaveCSS("opacity", "1");
  }
});

test("unsupported view timelines fall back to visible static content", async ({ page }) => {
  let replaced = false;
  await page.route("**/*.css", async (route) => {
    const response = await route.fetch();
    const original = await response.text();
    const body = original.replace(
      /@supports\s*\(animation-timeline:\s*view\(\)\)/g,
      "@supports (unsupported-reveal-test: enabled)",
    );
    replaced ||= body !== original;
    await route.fulfill({ response, body });
  });
  await page.goto("/es", { waitUntil: "domcontentloaded" });
  await expect.poll(() => replaced).toBe(true);
  const reveal = page.locator('[data-reveal="scroll"]').first();
  await expect(reveal).toHaveCSS("animation-name", "none");
  await expect(reveal).toHaveCSS("opacity", "1");
  await reveal.scrollIntoViewIfNeeded();
  await expect(reveal).toBeVisible();
});
