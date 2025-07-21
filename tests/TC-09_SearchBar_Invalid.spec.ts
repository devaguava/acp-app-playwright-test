 import { test, expect } from '@playwright/test';

test('Menggunakan search bar dengan keyword yang invalid"', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Masuk ke kanvas
  await page.getByRole('button', {name: 'Start Without Template'}).click();

  // Mencari notasi pada search bar menggunakan kata kunci yang invalid
  await page.getByRole('textbox', {name: 'Search Shapes'}).click();
  await page.getByRole('textbox', {name: 'Search Shapes'}).fill('acp');

  // Verifikasi bahwa notasi yang dicari tidak muncul
  await expect(page.getByText('Tidak ada hasil yang ditemukan')).toBeVisible;
  await page.screenshot({path: 'tests/screenshots/TC-09/after.png'});
});
