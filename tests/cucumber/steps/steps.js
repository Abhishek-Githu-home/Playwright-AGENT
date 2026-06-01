import { Before, After, Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { PageManager } from '../../pages/PageManager.js';
import { users, checkoutData, messages } from '../../fixtures/testData.js';

setDefaultTimeout(60_000);

Before(async function () {
  this.browser = await chromium.launch({ headless: true });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.pages = new PageManager(this.page);
});

After(async function () {
  await this.page.close();
  await this.context.close();
  await this.browser.close();
});

Given('I open the Sauce Demo login page', async function () {
  await this.pages.login.goto();
});

When('I login as a standard_user', async function () {
  await this.pages.login.login(users.standard_user.username, users.standard_user.password);
});

When('I login as a problem_user', async function () {
  await this.pages.login.login(users.problem_user.username, users.problem_user.password);
});

When('I login as a locked_out_user', async function () {
  await this.pages.login.login(users.locked_out_user.username, users.locked_out_user.password);
});

When('I login with invalid credentials', async function () {
  await this.pages.login.login(users.invalid_user.username, users.invalid_user.password);
});

Then('I should land on the inventory page', async function () {
  await this.page.waitForURL(/.*inventory.html/);
  await this.page.waitForSelector('.inventory_list');
});

Then('I should see a login error containing {string}', async function (message) {
  const err = await this.pages.login.getErrorMessage();
  await err.waitFor({ state: 'visible' });
  const text = await err.innerText();
  if (!text.includes(message)) {
    throw new Error(`Expected message to contain '${message}', but got '${text}'`);
  }
});

Then('I should see a locked out login error', async function () {
  const err = await this.pages.login.getErrorMessage();
  await err.waitFor({ state: 'visible' });
  const text = await err.innerText();
  if (!text.toLowerCase().includes(messages.lockedOut)) {
    throw new Error(`Expected locked out error, but got '${text}'`);
  }
});

Given('I am logged in as a standard_user', async function () {
  await this.pages.login.login(users.standard_user.username, users.standard_user.password);
});

Given('I am logged in as a problem_user', async function () {
  await this.pages.login.login(users.problem_user.username, users.problem_user.password);
});

Given('I have added a product to the cart', async function () {
  await this.pages.inventory.addFirstProductToCart();
});

When('I add the first product to the cart', async function () {
  await this.pages.inventory.addFirstProductToCart();
});

When('I open the cart', async function () {
  await this.pages.inventory.openCart();
});

Then('I should see {int} item(s?) in the cart', async function (expectedCount) {
  const count = await this.pages.cart.getCartItemCount();
  if (count !== expectedCount) {
    throw new Error(`Expected ${expectedCount} items in the cart, but found ${count}`);
  }
});

When('I remove the first item from the cart', async function () {
  await this.pages.cart.removeFirstItem();
});

When('I proceed to checkout', async function () {
  await this.pages.cart.proceedToCheckout();
});

When('I complete checkout with standard user checkout data', async function () {
  const data = checkoutData.standard_user;
  await this.pages.checkout.fillCheckoutForm(data.firstName, data.lastName, data.postalCode);
  await this.pages.checkout.continue();
  await this.pages.checkout.finish();
});

When('I complete checkout with problem user checkout data', async function () {
  const data = checkoutData.problem_user;
  await this.pages.checkout.fillCheckoutForm(data.firstName, data.lastName, data.postalCode);
  await this.pages.checkout.continue();
  await this.pages.checkout.finish();
});

Then('I should see the order confirmation page', async function () {
  const visible = await this.pages.checkout.isOrderCompleteVisible();
  if (!visible) {
    throw new Error('Expected order confirmation page to be visible');
  }
});

When('I continue without filling checkout fields', async function () {
  await this.pages.checkout.continue();
});

Then('I should see a checkout error message', async function () {
  const err = await this.pages.checkout.getErrorMessage();
  await err.waitFor({ state: 'visible' });
});
