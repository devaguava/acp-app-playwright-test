 import { test, expect } from '@playwright/test';

test('Memilih template saat sudah memasuki halaman kanvas', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Masuk ke kanvas
  await page.getByRole('button', {name: 'Start Without Template'}).click();

  // Screenshot sebelum penambahan template
  const target = page.locator('canvas').nth(1);
  const before = await target.screenshot({path: 'tests/screenshots/TC-04/before.png'});

  // Pilih opsi template
  await page.getByRole('button', { name: 'Template' }).click();
  await page.locator('div:nth-child(2) > .h-48 > .w-full > svg').click();

  // Verifikasi bahwa template telah ditambahkan ke kanvas
  const after = await target.screenshot({path: 'tests/screenshots/TC-04/after.png'});
  expect(before).not.toEqual(after);

});
