 import { test, expect } from '@playwright/test';

test('Menggunakan search bar dengan keyword yang valid', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Masuk ke kanvas
  await page.getByRole('button', {name: 'Start Without Template'}).click();

  // Mencari notasi pada search bar menggunakan kata kunci yang valid
  await page.getByRole('textbox', {name: 'Search Shapes'}).click();
  await page.getByRole('textbox', {name: 'Search Shapes'}).fill('Strategy');

  // Verifikasi bahwa notasi yang dicari muncul
  const result = page.locator('div').filter({hasText: /^Strategy$/}).nth(1);
  await expect(result).toBeVisible;
});
