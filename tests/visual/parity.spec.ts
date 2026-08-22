import { test, expect } from "@playwright/test";
import { VD3_THEME_PREFERENCE_KEY } from "../../src/constants/vd3-storage";

const viewports = [
  { name: "desktop", width: 1280, height: 800, maxDiffPixelRatio: 0.04 },
  { name: "mobile", width: 390, height: 844, maxDiffPixelRatio: 0.06 },
] as const;

const themes = ["light", "dark"] as const;

for (const vp of viewports) {
  for (const theme of themes) {
    test(`${vp.name} ${theme} default`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.addInitScript(
        ({ key, t }) => {
          localStorage.setItem(key, t);
        },
        { key: VD3_THEME_PREFERENCE_KEY, t: theme },
      );
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
      await page.addInitScript(
        ({ key, t }) => {
          localStorage.setItem(key, t);
        },
        { key: VD3_THEME_PREFERENCE_KEY, t: theme },
      );
      await page.goto("/", { waitUntil: "networkidle" });
      await page.locator(".vd-theme-switcher-toggle").click();
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

for (const vp of viewports) {
  for (const colorScheme of themes) {
    test(`${vp.name} system ${colorScheme} os`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.emulateMedia({ colorScheme });
      await page.addInitScript((key) => {
        localStorage.setItem(key, "system");
      }, VD3_THEME_PREFERENCE_KEY);
      await page.goto("/", { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await expect(page).toHaveScreenshot(
        `${vp.name}-${colorScheme}-default.png`,
        {
          maxDiffPixelRatio: vp.maxDiffPixelRatio,
          animations: "disabled",
        },
      );
    });
  }
}
