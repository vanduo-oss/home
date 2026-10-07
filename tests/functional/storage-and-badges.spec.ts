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
