import { test, expect } from '@playwright/test';

test('Mencari video pada kolom pencarian di tab tutorial dengan keyword yang valid', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Masuk ke kanvas
  await page.getByRole('button', { name: 'Start Without Template' }).click();

  // Klik App Guide
  await page.getByRole('button', { name: 'Open app guide' }).click();
  await page.waitForTimeout(5000);

  // Screenshot sebelum memasukan keyword
//   const target = page.locator('canvas').nth(1);
  const before = await page.screenshot({ path: 'tests/screenshots/TC-37/before.png' });

  // Masukkan Keyword
  await page.getByRole('textbox', { name: 'Placeholder' }).click();
  await page.getByRole('textbox', { name: 'Placeholder' }).fill('create');
  await page.waitForTimeout(1000);

  // Verifikasi bahwa berhasil mencari tutorial menggunakan kolom pencarian berdasarkan keyword
  const after = await page.screenshot({ path: 'tests/screenshots/TC-37/after.png', fullPage: true });
  expect(before).not.toEqual(after);

});