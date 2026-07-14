import { test, expect } from '@playwright/test';
import { AmazonPageManager } from '../pages/amazon/AmazonPageManager';
import { BASE_URL } from './config';

test.describe('Amazon - Add to Cart', () => {
  test('adding a product to the cart updates the cart badge', async ({ page }) => {
    const pages = new AmazonPageManager(page);
    await pages.home.goto(BASE_URL);
    await pages.home.openProductByIndex(0);

    const productTitle = await pages.product.getTitle();
    await pages.product.addToCart();

    expect(await pages.product.isAddedToCartBannerVisible()).toBeTruthy();
    expect(await pages.home.getCartCount()).toBe(1);

    await pages.home.openCart();
    expect(await pages.cart.getItemCount()).toBe(1);
    const titles = await page.locator('.cart-item-row').allInnerTexts();
    expect(titles.some((t) => t.includes(productTitle))).toBeTruthy();
  });

  test('increasing quantity before adding reflects in cart subtotal', async ({ page }) => {
    const pages = new AmazonPageManager(page);
    await pages.home.goto(BASE_URL);
    await pages.home.openProductByIndex(0);

    const unitPrice = await pages.product.getPrice();
    await pages.product.selectQuantity(2);
    await pages.product.addToCart();

    await pages.home.openCart();
    const subtotal = await pages.cart.getSubtotal();
    expect(subtotal).toBe(unitPrice * 2);
  });

  test('removing an item empties the cart', async ({ page }) => {
    const pages = new AmazonPageManager(page);
    await pages.home.goto(BASE_URL);
    await pages.home.openProductByIndex(1);
    await pages.product.addToCart();

    await pages.home.openCart();
    expect(await pages.cart.getItemCount()).toBe(1);

    await pages.cart.removeItemByIndex(0);
    expect(await pages.cart.isEmptyMessageVisible()).toBeTruthy();
  });
});
