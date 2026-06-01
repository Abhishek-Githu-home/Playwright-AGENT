class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
    this.removeButtons = page.locator('.cart_item button');
  }

  async getCartItemCount() {
    return this.cartItems.count();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async removeFirstItem() {
    await this.removeButtons.first().click();
  }
}
module.exports = {CartPage}
