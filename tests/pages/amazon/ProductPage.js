class ProductPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('#product-title');
    this.price = page.locator('#product-price');
    this.rating = page.locator('#product-rating');
    this.quantitySelect = page.locator('#quantity-select');
    this.addToCartButton = page.locator('#add-to-cart-button');
    this.buyNowButton = page.locator('#buy-now-button');
    this.addedToCartBanner = page.locator('#added-to-cart-banner');
  }

  async getTitle() {
    return this.title.innerText();
  }

  async getPrice() {
    const text = await this.price.first().innerText();
    const match = text.match(/[\d,]+/);
    return match ? Number(match[0].replace(/,/g, '')) : null;
  }

  async selectQuantity(qty) {
    await this.quantitySelect.selectOption(String(qty));
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async buyNow() {
    await this.buyNowButton.click();
  }

  async isAddedToCartBannerVisible() {
    return this.addedToCartBanner.isVisible();
  }
}

module.exports = { ProductPage };
