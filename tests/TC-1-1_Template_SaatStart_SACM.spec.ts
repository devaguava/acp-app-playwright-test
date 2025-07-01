 import { test, expect } from '@playwright/test';

test('Memilih template saat awal masuk app', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Klik button "Use a Template"
  await page.getByRole('button', {name: 'Use a Template'}).click();

  // Pilih opsi template
  await page.getByRole('heading', {name: 'SACM Template'}).click();

  // Verifikasi bahwa template muncul di kanvas
  const kanvas = page.locator('canvas').nth(1);
  await expect(kanvas).toBeVisible();
  await kanvas.click({position: {x: 312, y: 185}});
});
