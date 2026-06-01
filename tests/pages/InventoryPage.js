class InventoryPage {
  constructor(page) {
    this.page = page;
    this.productCards = page.locator('.inventory_item');
    this.cartLink = page.locator('a.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.productImages = page.locator('.inventory_item_img img');
  }

  async addFirstProductToCart() {
    const firstProduct = this.productCards.first();
    await firstProduct.locator('button').click();
  }

  async getCartBadgeCount() {
    if (await this.cartBadge.count() === 0) return 0;
    return Number(await this.cartBadge.innerText());
  }

  async openCart() {
    await this.cartLink.click();
  }

  async getCartItemsCount() {
    return this.page.locator('.cart_item').count();
  }

  async getProductImageData() {
    return this.page.$$eval('.inventory_item_img img', (els) =>
      els.map((img) => ({ src: img.src, naturalWidth: img.naturalWidth }))
    );
  }
}
module.exports = {InventoryPage}
