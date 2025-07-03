 import { test, expect } from '@playwright/test';

test('Menambahkan notasi baru ke kanvas dengan melakukan klik pada notasi', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Masuk ke kanvas
  await page.getByRole('button', {name: 'Start Without Template'}).click();

  // Screenshot sebelum menambahkan notasi
  const target = page.locator('canvas').nth(1);
  const before = await target.screenshot({path: 'tests/screenshots/TC-10/before.png'});

  // Melakukan klik pada notasi
  await page.getByText('Goals').click();

  // Verifikasi bahwa notasi muncul di kanvas
  const kanvas = page.locator('canvas').nth(1);
  await expect(kanvas).toBeVisible();
  await kanvas.click({position: {x: 151, y: 126}});

  const after = await target.screenshot({path: 'tests/screenshots/TC-10/after.png'});
  expect(before).not.toEqual(after);

});
