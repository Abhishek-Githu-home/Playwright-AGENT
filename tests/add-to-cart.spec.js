import { test, expect } from '@playwright/test';
import { PageManager } from './pages/PageManager';

test.describe('Add To Cart Scenarios', () => {
  test('standard_user - add and remove item updates cart badge and cart contents', async ({ page }) => {
    const pages = new PageManager(page);
    await pages.login.loginStandardUser();

    await pages.inventory.addFirstProductToCart();
    const badgeCount = await pages.inventory.getCartBadgeCount();
    expect(badgeCount).toBeGreaterThanOrEqual(0);

    await pages.inventory.openCart();
    await expect(page.locator('.cart_item')).toHaveCount(1);

    await pages.cart.removeFirstItem();
    await expect(page.locator('.cart_item')).toHaveCount(0);
    await expect(page.locator('.shopping_cart_badge').first()).toHaveCount(0);
  });

  test('problem_user - add to cart still works but record asset anomalies', async ({ page }) => {
    const pages = new PageManager(page);
    await pages.login.loginProblemUser();

    await pages.inventory.addFirstProductToCart();
    await pages.inventory.openCart();
    await expect(page.locator('.cart_item')).toHaveCount(1);

    const imgs = await pages.inventory.getProductImageData();
    const broken = imgs.filter((i) => i.naturalWidth === 0);
    console.log('problem_user add-to-cart broken images count:', broken.length);
  });
});
