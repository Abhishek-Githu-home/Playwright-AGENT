class ConfirmationPage {
  constructor(page) {
    this.page = page;
    this.successMessage = page.locator('#order-success-message');
    this.orderId = page.locator('#order-id');
  }

  async isOrderConfirmed() {
    return this.successMessage.isVisible();
  }

  async getOrderId() {
    return this.orderId.innerText();
  }
}

module.exports = { ConfirmationPage };
