// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Config for the Amazon-style POM suite. Scoped to tests/amazon so it
 * doesn't mix with the unrelated Sauce Demo suite under tests/.
 */
module.exports = defineConfig({
  testDir: './tests/amazon',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report-amazon', open: 'never' }],
    ['allure-playwright', { resultsDir: 'allure-results' }],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    headless: true,
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || '/opt/pw-browsers/chromium',
    },
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'node mock-site/server.js',
        url: 'http://127.0.0.1:4173',
        reuseExistingServer: !process.env.CI,
        env: { PORT: '4173' },
      },
});
