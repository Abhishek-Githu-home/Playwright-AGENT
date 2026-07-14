const { HomePage } = require('./HomePage');
const { SearchResultsPage } = require('./SearchResultsPage');
const { ProductPage } = require('./ProductPage');
const { CartPage } = require('./CartPage');
const { CheckoutPage } = require('./CheckoutPage');
const { ConfirmationPage } = require('./ConfirmationPage');

class AmazonPageManager {
  constructor(page) {
    this.page = page;
    this.home = new HomePage(page);
    this.searchResults = new SearchResultsPage(page);
    this.product = new ProductPage(page);
    this.cart = new CartPage(page);
    this.checkout = new CheckoutPage(page);
    this.confirmation = new ConfirmationPage(page);
  }
}

module.exports = { AmazonPageManager };
