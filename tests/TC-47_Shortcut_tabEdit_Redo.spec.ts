import { test, expect } from '@playwright/test';

test('Menggunakan shortcut "Redo" yang valid melalui tab Edit', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Masuk ke kanvas
  await page.getByRole('button', { name: 'Start Without Template' }).click();
  
  // Melakukan klik pada notasi
  await page.getByText('Goals').click();

  // Menambahkan identifier pada notasi
  await page.locator('div').filter({ hasText: /^ID Text$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^ID Text$/ }).getByRole('textbox').fill('1');

  // Screenshot sebelum penggunaan shortcut
  const target = page.locator('canvas').nth(1);
  const before = await target.screenshot({path: 'tests/screenshots/TC-47/before.png'});

  // Melakukan Undo
  await page.getByRole('button', { name: 'EDIT' }).click();
  await page.getByRole('button', { name: 'Undo Ctrl+Z' }).click();

  // Valid shortcut redo melalui tab Edit
  await page.getByRole('button', { name: 'EDIT' }).click();
  await page.getByRole('button', { name: 'Redo Ctrl+Y' }).click();

  // Verifikasi bahwa shortcut berhasil sesuai dengan opsi edit yang dipilih
  const after = await target.screenshot({path: 'tests/screenshots/TC-47/after.png'});
  expect(before).toEqual(after);

});