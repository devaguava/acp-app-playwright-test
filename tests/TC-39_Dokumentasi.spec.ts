import { test, expect } from '@playwright/test';

test('Membuka Dokumentasi', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Masuk ke kanvas
  await page.getByRole('button', { name: 'Start Without Template' }).click();

  // Screenshot sebelum membuka dokumentasi
//   const target = page.locator('canvas').nth(1);
  const before = await page.screenshot({ path: 'tests/screenshots/TC-39/before.png' });

  // Klik App Guide
  await page.getByRole('button', { name: 'Open notation guide' }).click();
  await page.waitForTimeout(2000);

  // Verifikasi bahwa berhasil membuka dokumentasi
  const after = await page.screenshot({ path: 'tests/screenshots/TC-39/after.png', fullPage: true });
  expect(before).not.toEqual(after);

});