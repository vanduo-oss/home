import { defineConfig, devices } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)));

export default defineConfig({
  testDir: "./tests/visual",
  testMatch: "parity.spec.ts",
  snapshotPathTemplate: "{testDir}/baselines/{arg}{ext}",

  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,

  reporter: [["list"]],

  use: {
    baseURL: "http://localhost:8787",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "Chromium Desktop",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: {
    command: process.env.CI
      ? "pnpm run preview >/dev/null 2>&1"
      : "pnpm run preview",
    url: "http://localhost:8787",
    reuseExistingServer: !process.env.CI,
    timeout: 60 * 1000,
    cwd: projectRoot,
  },
});
