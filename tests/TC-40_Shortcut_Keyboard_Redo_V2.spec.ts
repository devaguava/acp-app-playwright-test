import { test, expect } from '@playwright/test';

test('Menggunakan shortcut "Redo" yang valid melalui keyboard (Ctrl+Shift+Z)', async ({ page }) => {
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
  const before = await target.screenshot({path: 'tests/screenshots/TC-40/before.png'});

  // Melakukan Undo
  await page.locator('body').press('Control+Z');

  // Valid shortcut redo ctrl+shift+Z menggunakan keyboard
  await page.locator('body').press('Control+Shift+Z');

  // Verifikasi bahwa shortcut berhasil sesuai dengan kombinasi tombol keyboard yang ditekan
  const after = await target.screenshot({path: 'tests/screenshots/TC-40/after.png'});
  expect(before).toEqual(after);

});