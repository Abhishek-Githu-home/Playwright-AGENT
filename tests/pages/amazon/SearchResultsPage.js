class SearchResultsPage {
  constructor(page) {
    this.page = page;
    this.heading = page.locator('#search-results-heading');
    this.productCards = page.locator('.product-card');
    this.noResultsMessage = page.locator('#no-results-message');
  }

  async getResultsCount() {
    return this.productCards.count();
  }

  async getResultTitles() {
    return this.page.locator('.product-card .title').allInnerTexts();
  }

  async openResultByIndex(index = 0) {
    await this.productCards.nth(index).click();
  }

  async openResultByTitle(titleSubstring) {
    await this.page.locator('.product-card', { hasText: titleSubstring }).first().click();
  }

  async isNoResultsMessageVisible() {
    return this.noResultsMessage.isVisible();
  }
}

module.exports = { SearchResultsPage };
