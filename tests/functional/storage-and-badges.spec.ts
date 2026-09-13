import { test, expect } from "@playwright/test";
import { VD3_THEME_PREFERENCE_KEY } from "../../src/constants/vd3-storage";

test("theme toggle persists under vanduo-oss- prefix only", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.locator(".vd-theme-switcher-toggle").click();

  const keys = await page.evaluate(() => Object.keys(localStorage));
  expect(keys).toContain(VD3_THEME_PREFERENCE_KEY);
  expect(keys).not.toContain("vanduo-theme-preference");
});

test("Labs line shows experimental badge", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const badges = page.locator('a.line[href="https://labs.vanduo.dev"] .badge');
  await expect(badges).toHaveCount(1);
  await expect(badges.nth(0)).toHaveText("experimental");
});
