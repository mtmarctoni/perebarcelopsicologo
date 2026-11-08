import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e/seo",
  workers: 2,
  use: {
    baseURL: "http://localhost:3200",
    channel: "chrome",
    trace: "retain-on-failure",
  },
  projects: [{ name: "seo", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "pnpm build && pnpm start --port 3200",
    url: "http://localhost:3200",
    reuseExistingServer: false,
    timeout: 180_000,
    env: { APP_ENV: "production", SITE_URL: "https://perebarcelopsicologo.com" },
  },
});
