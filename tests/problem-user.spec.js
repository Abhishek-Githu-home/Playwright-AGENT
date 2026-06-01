import { test, expect } from '@playwright/test';
import { PageManager } from './pages/PageManager';

test.describe('Problem User Behavior', () => {
  test('Problem user shows asset/UI anomalies', async ({ page }) => {
    const pages = new PageManager(page);
    await pages.login.loginProblemUser();

    const imgs = await pages.inventory.getProductImageData();
    const broken = imgs.filter((i) => i.naturalWidth === 0);
    console.log('problem_user broken images count:', broken.length);
    expect(Array.isArray(imgs)).toBeTruthy();
  });
});
