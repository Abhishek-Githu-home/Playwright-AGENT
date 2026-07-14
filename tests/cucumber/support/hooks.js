const { Before, After, BeforeAll, AfterAll, setDefaultTimeout, Status } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { startServer } = require('../../../mock-site/server');
const { BASE_URL } = require('../../amazon/config');

setDefaultTimeout(30_000);

let mockServerHandle;
let browser;

BeforeAll(async function () {
  if (!process.env.BASE_URL) {
    mockServerHandle = await startServer(4173);
  }
  browser = await chromium.launch({
    headless: true,
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || '/opt/pw-browsers/chromium',
  });
});

AfterAll(async function () {
  await browser.close();
  if (mockServerHandle) {
    await new Promise((resolve) => mockServerHandle.server.close(resolve));
  }
});

Before(async function () {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
  await this.initPageManager();
  this.baseUrl = BASE_URL;
});

After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot();
    this.attach(screenshot, 'image/png');
  }
  await this.page.close();
  await this.context.close();
});
