import { test, expect } from "@playwright/test";

const LIVE_URL = "https://vanduo.dev/";

const viewports = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "mobile", width: 390, height: 844 },
] as const;

const themes = ["light", "dark"] as const;

for (const vp of viewports) {
  for (const theme of themes) {
    test(`${vp.name} ${theme} default`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.addInitScript((t) => {
        localStorage.setItem("vanduo-theme-preference", t);
      }, theme);
      await page.goto(LIVE_URL, { waitUntil: "networkidle" });
      await expect(page).toHaveScreenshot(`${vp.name}-${theme}-default.png`, {
        maxDiffPixelRatio: 0,
        animations: "disabled",
      });
    });

    test(`${vp.name} ${theme} after-toggle`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.addInitScript((t) => {
        localStorage.setItem("vanduo-theme-preference", t);
      }, theme);
      await page.goto(LIVE_URL, { waitUntil: "networkidle" });
      await page.locator(".theme-toggle").click();
      await expect(page).toHaveScreenshot(
        `${vp.name}-${theme}-after-toggle.png`,
        {
          maxDiffPixelRatio: 0,
          animations: "disabled",
        },
      );
    });
  }
}
