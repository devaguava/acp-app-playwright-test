import { test, expect } from '@playwright/test';

test('Menggunakan shortcut "Delete" yang valid melalui tab Edit', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Masuk ke kanvas
  await page.getByRole('button', { name: 'Start Without Template' }).click();
  
  // Melakukan klik pada notasi
  await page.getByText('Goals').click();

  // Screenshot sebelum penggunaan shortcut
  const target = page.locator('canvas').nth(1);
  const before = await target.screenshot({path: 'tests/screenshots/TC-48/before.png'});

  // Valid shortcut delete melalui tab Edit
  await page.getByRole('button', { name: 'EDIT' }).click();
  await page.getByRole('button', { name: 'Delete Del' }).click();

  // Verifikasi bahwa shortcut berhasil sesuai dengan opsi edit yang dipilih
  const after = await target.screenshot({path: 'tests/screenshots/TC-48/after.png'});
  expect(before).not.toEqual(after);

});