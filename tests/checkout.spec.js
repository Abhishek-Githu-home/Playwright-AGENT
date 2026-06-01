import { test, expect } from '@playwright/test';
import { PageManager } from './pages/PageManager';

test.describe('Checkout Scenarios', () => {
  test('standard_user - complete checkout happy path', async ({ page }) => {
    const pages = new PageManager(page);
    await pages.login.loginStandardUser();

    await pages.inventory.addFirstProductToCart();
    await pages.inventory.openCart();
    await expect(page.locator('.cart_item')).toHaveCount(1);

    await pages.cart.proceedToCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one.html/);

    await pages.checkout.fillCheckoutForm('John', 'Doe', '12345');
    await pages.checkout.continue();

    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    await expect(page.locator('.cart_item')).toHaveCount(1);

    await pages.checkout.finish();
    await expect(page.locator('.complete-header')).toBeVisible();
  });

  test('validation - missing checkout fields', async ({ page }) => {
    const pages = new PageManager(page);
    await pages.login.loginStandardUser();
    await pages.inventory.addFirstProductToCart();
    await pages.inventory.openCart();

    await pages.cart.proceedToCheckout();
    await pages.checkout.continue();
    const err = await pages.checkout.getErrorMessage();
    await expect(err).toBeVisible();
  });

  test('problem_user - checkout flow stability', async ({ page }) => {
    const pages = new PageManager(page);
    await pages.login.loginProblemUser();
    await pages.inventory.addFirstProductToCart();
    await pages.inventory.openCart();

    await pages.cart.proceedToCheckout();
    await pages.checkout.fillCheckoutForm('Problem', 'User', '00000');
    await pages.checkout.continue();

    await expect(page.locator('.cart_item')).toHaveCount(1);
    await pages.checkout.finish();
    await expect(page.locator('.complete-header')).toBeVisible();
  });
});