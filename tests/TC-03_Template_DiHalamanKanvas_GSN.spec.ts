 import { test, expect } from '@playwright/test';

test('Memilih template GSN saat sudah memasuki halaman kanvas', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Masuk ke kanvas
  await page.getByRole('button', {name: 'Start Without Template'}).click();

  // Screenshot sebelum penambahan template
  const target = page.locator('canvas').nth(1);
  const before = await target.screenshot({path: 'tests/screenshots/TC-03/before.png'});

  // Pilih opsi template
  await page.getByRole('button', { name: 'Template' }).click();
  await page.locator('.w-full > svg').first().click();

  // Verifikasi bahwa template telah ditambahkan ke kanvas
  const after = await target.screenshot({path: 'tests/screenshots/TC-03/after.png'});
  expect(before).not.toEqual(after);

});
