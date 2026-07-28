import { test, expect } from "@playwright/test";

const viewports = [
  { name: "desktop", width: 1280, height: 800, maxDiffPixelRatio: 0.04 },
  { name: "mobile", width: 390, height: 844, maxDiffPixelRatio: 0.06 },
] as const;

const themes = ["light", "dark"] as const;

for (const vp of viewports) {
  for (const theme of themes) {
    test(`${vp.name} ${theme} default`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.addInitScript((t) => {
        localStorage.setItem("vanduo-theme-preference", t);
      }, theme);
      await page.goto("/", { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await expect(page).toHaveScreenshot(`${vp.name}-${theme}-default.png`, {
        // Static HTML vs SSG hydration shifts glyph subpixels; diffs are
        // antialiasing fringes only, not layout or color. Mobile (390px) runs
        // ~5% on Linux CI vs macOS-captured baselines; desktop stays ~3.4%.
        maxDiffPixelRatio: vp.maxDiffPixelRatio,
        animations: "disabled",
      });
    });

    test(`${vp.name} ${theme} after-toggle`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.addInitScript((t) => {
        localStorage.setItem("vanduo-theme-preference", t);
      }, theme);
      await page.goto("/", { waitUntil: "networkidle" });
      await page.locator(".theme-toggle").click();
      await page.evaluate(() => document.fonts.ready);
      await expect(page).toHaveScreenshot(
        `${vp.name}-${theme}-after-toggle.png`,
        {
          maxDiffPixelRatio: vp.maxDiffPixelRatio,
          animations: "disabled",
        },
      );
    });
  }
}
