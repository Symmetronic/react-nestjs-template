import { defineConfig, devices } from "@playwright/test";
import { port } from "../frontend/vite.config";

export const baseUrl = `http://localhost:${port}`;

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env["CI"],
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],
  reporter: "html",
  retries: process.env["CI"] ? 2 : 0,
  testDir: "./e2e",
  use: {
    baseURL: baseUrl,
    trace: "on-first-retry",
  },
  webServer: {
    command: "cd .. && npm run dev",
    url: baseUrl,
    reuseExistingServer: !process.env["CI"],
  },
  ...(process.env["CI"] && { workers: 1 }),
});
