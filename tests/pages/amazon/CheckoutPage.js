class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.fullName = page.locator('#full-name');
    this.address = page.locator('#address');
    this.city = page.locator('#city');
    this.pincode = page.locator('#pincode');
    this.phone = page.locator('#phone');
    this.placeOrderButton = page.locator('#placeYourOrder1');
    this.fullNameError = page.locator('#full-name-error');
  }

  async fillShippingDetails({ fullName, address, city, pincode, phone }) {
    await this.fullName.fill(fullName);
    await this.address.fill(address);
    await this.city.fill(city);
    await this.pincode.fill(pincode);
    await this.phone.fill(phone);
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }

  async isFullNameErrorVisible() {
    return this.fullNameError.isVisible();
  }
}

module.exports = { CheckoutPage };
