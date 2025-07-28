import { test, expect } from '@playwright/test';

test('Menggunakan shortcut "Select All" yang valid melalui keyboard', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Masuk kanvas
  await page.getByRole('button', {name: 'Use a Template'}).click();

  // Pilih opsi template
  await page.getByRole('heading', {name: 'GSN Template'}).click();

  // Screenshot sebelum penggunaan shortcut
  const target = page.locator('canvas').nth(1);
  const before = await target.screenshot({path: 'tests/screenshots/TC-37/before.png'});

  await page.locator('canvas').nth(1).click({
    position: {
      x: 185,
      y: 143
    }
  });

  // Valid shortcut select all menggunakan keyboard
  await page.locator('body').press('Control+A');

  // Verifikasi bahwa shortcut berhasil sesuai dengan kombinasi tombol keyboard yang ditekan
  const after = await target.screenshot({path: 'tests/screenshots/TC-37/after.png'});
  expect(before).not.toEqual(after);

});