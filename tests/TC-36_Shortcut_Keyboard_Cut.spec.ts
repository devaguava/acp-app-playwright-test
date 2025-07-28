import { test, expect } from '@playwright/test';

test('Menggunakan shortcut "Cut" yang valid melalui keyboard', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Masuk ke kanvas
  await page.getByRole('button', { name: 'Start Without Template' }).click();
  
  // Melakukan klik pada notasi
  await page.getByText('Goals').click();

  // Screenshot sebelum penggunaan shortcut
  const target = page.locator('canvas').nth(1);
  const before = await target.screenshot({path: 'tests/screenshots/TC-36/before.png'});

  await page.locator('canvas').nth(1).click({
    position: {
      x: 185,
      y: 143
    }
  });

  // Valid shortcut cut menggunakan keyboard
  await page.locator('body').press('Control+X');

  // Verifikasi bahwa shortcut berhasil sesuai dengan kombinasi tombol keyboard yang ditekan
  const after = await target.screenshot({path: 'tests/screenshots/TC-36/after.png'});
  expect(before).not.toEqual(after);

});