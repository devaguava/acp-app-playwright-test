import { test, expect, chromium } from '@playwright/test';

test('Login & Logout GitHub (langsung dalam satu file)', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // LOGIN
  await page.goto('https://github.com/login');
  await page.fill('input[name="login"]', 'devaguava22@gmail.com');
  await page.fill('input[name="password"]', 'insert_password');
  await page.click('input[name="commit"]');
  await page.waitForURL('https://github.com/');

  // TEST LOGOUT
  await page.getByRole('button', { name: 'Open user navigation menu' }).click();
  await page.getByRole('link', { name: 'Sign out' }).click();
  await page.getByRole('button', { name: 'Sign out', exact: true }).click();

  await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();

  await browser.close();
});
