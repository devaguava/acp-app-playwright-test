import { test, expect } from '@playwright/test';

test('Menggunakan shortcut yang valid melalui tab Edit', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Masuk kanvas
  await page.getByRole('button', {name: 'Use a Template'}).click();

  // Pilih opsi template
  await page.getByRole('heading', {name: 'GSN Template'}).click();

  // Screenshot sebelum penggunaan shortcut
  const target = page.locator('canvas').nth(1);
  const before = await target.screenshot({path: 'tests/screenshots/TC-45/before.png'});

  // Valid shortcut select all melalui tab Edit
  await page.getByRole('button', { name: 'EDIT' }).click();
  await page.getByRole('button', { name: 'Select All Ctrl+A' }).click();

  // Verifikasi bahwa shortcut berhasil sesuai dengan opsi edit yang dipilih
  const after = await target.screenshot({path: 'tests/screenshots/TC-45/after.png'});
  expect(before).not.toEqual(after);

});