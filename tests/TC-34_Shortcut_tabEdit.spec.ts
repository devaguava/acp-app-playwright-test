import { test, expect } from '@playwright/test';

test('Menggunakan shortcut yang valid melalui tab "EDIT"', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Masuk ke kanvas
  await page.getByRole('button', { name: 'Start Without Template' }).click();
  
  // Melakukan klik pada notasi
  await page.locator('div').filter({ hasText: /^Goals$/ }).first().click();
  await page.locator('div').filter({ hasText: /^Context$/ }).first().click();

  // Screenshot sebelum penggunaan shortcut
  const target = page.locator('canvas').nth(1);
  const before = await target.screenshot();

  // Shortcut melalui tab Edit
  await page.getByRole('button', { name: 'EDIT' }).click();
  await page.getByRole('button', { name: 'Undo Ctrl+Z' }).click();

  // Verifikasi bahwa shortcut berhasil sesuai dengan opsi edit yang dipilih
  const after = await target.screenshot();
  expect(before).not.toEqual(after);

});