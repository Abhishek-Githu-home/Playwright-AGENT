import { test, expect } from '@playwright/test';
import { PageManager } from './pages/PageManager';

test.describe('Login Scenarios', () => {
  test('standard_user - valid login navigates to products', async ({ page }) => {
    const pages = new PageManager(page);
    await pages.login.loginStandardUser();
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('invalid credentials shows error message', async ({ page }) => {
    const pages = new PageManager(page);
    await pages.login.goto();
    await pages.login.login('invalid_user', 'bad_password');
    const err = await pages.login.getErrorMessage();
    await expect(err).toBeVisible();
    await expect(err).toContainText('Epic sadface');
  });

  test('locked_out_user cannot login', async ({ page }) => {
    const pages = new PageManager(page);
    await pages.login.loginLockedOutUser();
    const err = await pages.login.getErrorMessage();
    await expect(err).toBeVisible();
    await expect(err).toContainText('locked out');
  });

  test('problem_user - can login but may have UI anomalies', async ({ page }) => {
    const pages = new PageManager(page);
    await pages.login.loginProblemUser();
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });
});
