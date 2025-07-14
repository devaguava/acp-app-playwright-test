import { test, expect } from '@playwright/test';

test('Menggunakan shortcut yang valid melalui keyboard', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Masuk ke kanvas
  await page.getByRole('button', { name: 'Start Without Template' }).click();
  
  // Melakukan klik pada notasi
  await page.getByText('Goals').click();

  // Screenshot sebelum penggunaan shortcut
  const target = page.locator('canvas').nth(1);
  const before = await target.screenshot({path: 'tests/screenshots/TC-34/before.png'});

  // Copy notasi
  await page.locator('body').press('Control+C');

  // Valid shortcut paste menggunakan keyboard
  await page.locator('body').press('Control+V');
  await page.waitForTimeout(500);

  // Verifikasi bahwa shortcut berhasil sesuai dengan kombinasi tombol keyboard yang ditekan
  const after = await target.screenshot({path: 'tests/screenshots/TC-34/after.png'});
  expect(before).not.toEqual(after);
  

});