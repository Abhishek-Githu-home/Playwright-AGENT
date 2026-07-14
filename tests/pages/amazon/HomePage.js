class HomePage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('#twotabsearchtextbox');
    this.searchButton = page.locator('#nav-search-submit-button');
    this.cartLink = page.locator('#nav-cart');
    this.cartCount = page.locator('#nav-cart-count');
    this.productGrid = page.locator('#product-grid');
    this.productCards = page.locator('.product-card');
  }

  async goto(baseUrl) {
    await this.page.goto(baseUrl);
  }

  async search(query) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async getCartCount() {
    return Number(await this.cartCount.innerText());
  }

  async openProductByIndex(index = 0) {
    await this.productCards.nth(index).click();
  }

  async getProductTitles() {
    return this.page.locator('.product-card .title').allInnerTexts();
  }
}

module.exports = { HomePage };
