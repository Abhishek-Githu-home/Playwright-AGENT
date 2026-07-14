import { test, expect } from '@playwright/test';
import { AmazonPageManager } from '../pages/amazon/AmazonPageManager';
import { BASE_URL } from './config';
import { searchTerms } from '../fixtures/amazonTestData';

test.describe('Amazon - Search', () => {
  test('searching for an existing product returns matching results', async ({ page }) => {
    const pages = new AmazonPageManager(page);
    await pages.home.goto(BASE_URL);
    await pages.home.search(searchTerms.existing);

    await expect(page).toHaveURL(/search\.html\?q=/);
    const count = await pages.searchResults.getResultsCount();
    expect(count).toBeGreaterThan(0);

    const titles = await pages.searchResults.getResultTitles();
    expect(titles.some((t) => t.toLowerCase().includes('headphones'))).toBeTruthy();
  });

  test('searching for a non-existing product shows no results message', async ({ page }) => {
    const pages = new AmazonPageManager(page);
    await pages.home.goto(BASE_URL);
    await pages.home.search(searchTerms.nonExisting);

    expect(await pages.searchResults.getResultsCount()).toBe(0);
    expect(await pages.searchResults.isNoResultsMessageVisible()).toBeTruthy();
  });

  test('home page lists deal products', async ({ page }) => {
    const pages = new AmazonPageManager(page);
    await pages.home.goto(BASE_URL);
    const titles = await pages.home.getProductTitles();
    expect(titles.length).toBeGreaterThan(0);
  });
});
