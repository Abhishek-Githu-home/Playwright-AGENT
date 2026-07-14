class CartPage {
  constructor(page) {
    this.page = page;
    this.rows = page.locator('.cart-item-row');
    this.emptyCartMessage = page.locator('#empty-cart-message');
    this.subtotal = page.locator('#cart-subtotal');
    this.totalQty = page.locator('#cart-total-qty');
    this.proceedToCheckoutButton = page.locator('#proceed-to-checkout');
  }

  async getItemCount() {
    return this.rows.count();
  }

  async getSubtotal() {
    const text = await this.subtotal.innerText();
    const match = text.match(/[\d,]+/);
    return match ? Number(match[0].replace(/,/g, '')) : null;
  }

  async removeItemByIndex(index = 0) {
    await this.rows.nth(index).locator('.remove-link').click();
  }

  async isEmptyMessageVisible() {
    return this.emptyCartMessage.isVisible();
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }
}

module.exports = { CartPage };
