import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

function contrast(foreground: string, opacity: string, background: string) {
  const fg = foreground.match(/[\d.]+/g)?.map(Number) ?? [];
  const bg = background.match(/[\d.]+/g)?.map(Number) ?? [];
  const alpha = (fg[3] ?? 1) * Number(opacity);
  const luminance = (rgb: number[]) =>
    rgb.slice(0, 3).reduce((sum, channel, index) => {
      const value = channel / 255;
      return (
        sum +
        (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4) *
          [0.2126, 0.7152, 0.0722][index]
      );
    }, 0);
  // The decorative gradient can lighten the footer by at most 4% white.
  const backdrop = bg.slice(0, 3).map((channel) => channel * 0.96 + 255 * 0.04);
  const text = backdrop.map((channel, index) => fg[index] * alpha + channel * (1 - alpha));
  const a = luminance(text);
  const b = luminance(backdrop);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

for (const theme of ["light", "dark"]) {
  test(`${theme} lower footer stays muted, consistent and readable`, async ({ page }) => {
    await page.goto("/es");
    await page.getByRole("button", { name: "Cerrar", exact: true }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await page.evaluate(
      (value) => document.documentElement.classList.toggle("dark", value === "dark"),
      theme,
    );
    const footer = page.getByRole("contentinfo");
    const copyright = footer.getByText(/Todos los derechos reservados/);
    const privacy = footer.getByRole("link", { name: "Política de Privacidad", exact: true });
    const cookies = footer.getByRole("button", { name: "Configuración de cookies" });
    await copyright.scrollIntoViewIfNeeded();
    await page.waitForTimeout(350);

    const styles = [];
    for (const element of [copyright, privacy, cookies]) {
      styles.push(
        await element.evaluate((node) => {
          const style = getComputedStyle(node);
          return {
            color: style.color,
            opacity: style.opacity,
            decoration: style.textDecorationLine,
          };
        }),
      );
    }
    expect.soft(styles[1]).toEqual(styles[0]);
    expect.soft(styles[2]).toEqual(styles[0]);
    expect.soft(styles[0].color).not.toBe("rgb(255, 255, 255)");
    const background = await footer.evaluate((node) => getComputedStyle(node).backgroundColor);
    for (const style of styles) {
      expect.soft(contrast(style.color, style.opacity, background)).toBeGreaterThanOrEqual(4.5);
    }
    const results = await new AxeBuilder({ page }).include("footer .border-t").analyze();
    expect(results.violations).toEqual([]);

    for (const control of [privacy, cookies]) {
      await control.hover();
      await page.waitForTimeout(350);
      await expect(control).toHaveCSS("color", "rgb(255, 255, 255)");
      await page.mouse.move(0, 0);
      await control.focus();
      await page.keyboard.press("Shift");
      const outline = await control.evaluate((node) => {
        const style = getComputedStyle(node);
        return { style: style.outlineStyle, width: Number.parseFloat(style.outlineWidth) };
      });
      expect(outline.style).not.toBe("none");
      expect(outline.width).toBeGreaterThanOrEqual(2);
    }
    await cookies.press("Enter");
    await expect(page.getByRole("dialog")).toBeVisible();
  });
}
