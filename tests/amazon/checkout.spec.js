import { test, expect } from '@playwright/test';
import { AmazonPageManager } from '../pages/amazon/AmazonPageManager';
import { BASE_URL } from './config';
import { shippingDetails } from '../fixtures/amazonTestData';

test.describe('Amazon - Checkout', () => {
  test('completing checkout with valid shipping details places the order', async ({ page }) => {
    const pages = new AmazonPageManager(page);
    await pages.home.goto(BASE_URL);
    await pages.home.openProductByIndex(0);
    await pages.product.addToCart();

    await pages.home.openCart();
    await pages.cart.proceedToCheckout();

    await pages.checkout.fillShippingDetails(shippingDetails.valid);
    await pages.checkout.placeOrder();

    await expect(page).toHaveURL(/confirmation\.html/);
    expect(await pages.confirmation.isOrderConfirmed()).toBeTruthy();
    expect(await pages.confirmation.getOrderId()).toMatch(/^DEMO-\d{6}$/);
  });

  test('submitting checkout with missing full name shows a validation error', async ({ page }) => {
    const pages = new AmazonPageManager(page);
    await pages.home.goto(BASE_URL);
    await pages.home.openProductByIndex(0);
    await pages.product.addToCart();

    await pages.home.openCart();
    await pages.cart.proceedToCheckout();

    await pages.checkout.fillShippingDetails({ ...shippingDetails.valid, fullName: '' });
    await pages.checkout.placeOrder();

    expect(await pages.checkout.isFullNameErrorVisible()).toBeTruthy();
    await expect(page).toHaveURL(/checkout\.html/);
  });

  test('order confirmation clears the cart', async ({ page }) => {
    const pages = new AmazonPageManager(page);
    await pages.home.goto(BASE_URL);
    await pages.home.openProductByIndex(0);
    await pages.product.addToCart();

    await pages.home.openCart();
    await pages.cart.proceedToCheckout();
    await pages.checkout.fillShippingDetails(shippingDetails.valid);
    await pages.checkout.placeOrder();

    await pages.home.goto(BASE_URL);
    expect(await pages.home.getCartCount()).toBe(0);
  });
});
