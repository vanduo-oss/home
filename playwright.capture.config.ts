import { defineConfig, devices } from "@playwright/test";

/** Captures baselines from the live site — no local webServer. */
export default defineConfig({
  testDir: "./tests/visual",
  testMatch: "capture-baseline.spec.ts",
  snapshotPathTemplate: "{testDir}/baselines/{arg}{ext}",

  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,

  reporter: [["list"]],

  use: {
    trace: "off",
  },

  projects: [
    {
      name: "Chromium Desktop",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
