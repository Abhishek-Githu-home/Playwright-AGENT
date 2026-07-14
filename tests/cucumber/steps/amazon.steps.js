const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('node:assert/strict');
const { shippingDetails } = require('../../fixtures/amazonTestData');

Given('I am on the Amazon home page', async function () {
  await this.pages.home.goto(this.baseUrl);
});

When('I search for {string}', async function (term) {
  await this.pages.home.search(term);
});

Then('I should see search results containing {string}', async function (term) {
  const count = await this.pages.searchResults.getResultsCount();
  assert.ok(count > 0, `Expected at least one result for "${term}"`);
  const titles = await this.pages.searchResults.getResultTitles();
  assert.ok(
    titles.some((t) => t.toLowerCase().includes(term.toLowerCase())),
    `Expected a result title to contain "${term}", got: ${titles.join(', ')}`
  );
});

Then('I should see a no results message', async function () {
  const visible = await this.pages.searchResults.isNoResultsMessageVisible();
  assert.ok(visible, 'Expected the no-results message to be visible');
});

When('I open the first product on the home page', async function () {
  await this.pages.home.openProductByIndex(0);
});

When('I add the product to the cart', async function () {
  await this.pages.product.addToCart();
});

Then('the added to cart confirmation should be visible', async function () {
  const visible = await this.pages.product.isAddedToCartBannerVisible();
  assert.ok(visible, 'Expected the "added to cart" banner to be visible');
});

Then('the cart badge should show {int} item', async function (expectedCount) {
  const count = await this.pages.home.getCartCount();
  assert.equal(count, expectedCount);
});

Given('I have added a product to the cart', async function () {
  await this.pages.home.goto(this.baseUrl);
  await this.pages.home.openProductByIndex(0);
  await this.pages.product.addToCart();
});

When('I open the cart', async function () {
  await this.pages.home.openCart();
});

When('I remove the first item from the cart', async function () {
  await this.pages.cart.removeItemByIndex(0);
});

Then('the cart should be empty', async function () {
  const empty = await this.pages.cart.isEmptyMessageVisible();
  assert.ok(empty, 'Expected the cart to be empty');
});

When('I proceed to checkout', async function () {
  await this.pages.cart.proceedToCheckout();
});

When('I fill in valid shipping details', async function () {
  await this.pages.checkout.fillShippingDetails(shippingDetails.valid);
});

When('I fill in shipping details without a full name', async function () {
  await this.pages.checkout.fillShippingDetails({ ...shippingDetails.valid, fullName: '' });
});

When('I place the order', async function () {
  await this.pages.checkout.placeOrder();
});

Then('I should see the order confirmation page', async function () {
  const confirmed = await this.pages.confirmation.isOrderConfirmed();
  assert.ok(confirmed, 'Expected the order confirmation page to be shown');
});

Then('the order id should be displayed', async function () {
  const orderId = await this.pages.confirmation.getOrderId();
  assert.match(orderId, /^DEMO-\d{6}$/);
});

Then('I should see a full name validation error', async function () {
  const visible = await this.pages.checkout.isFullNameErrorVisible();
  assert.ok(visible, 'Expected the full name validation error to be visible');
});
