import { test, expect } from '@playwright/test';

test('Menggunakan shortcut yang invalid (tidak terdaftar) melalui keyboard', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Masuk ke kanvas
  await page.getByRole('button', { name: 'Start Without Template' }).click();
  
  // Melakukan klik pada notasi
  await page.getByText('Goals').click();

  // Screenshot sebelum penggunaan shortcut
  const target = page.locator('canvas').nth(1);
  const before = await target.screenshot({path: 'tests/screenshots/TC-49/before.png'});

  // Invalid shortcut cut menggunakan keyboard
  await page.locator('body').press('Shift+x');

  // Verifikasi bahwa sistem tidak memberikan respon
  const after = await target.screenshot({path: 'tests/screenshots/TC-49/after.png'});
  expect(before).toEqual(after);

});