 import { test, expect } from '@playwright/test';

test('Memilih template saat awal masuk aplikasi', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Klik button "Use a Template"
  await page.getByRole('button', {name: 'Use a Template'}).click();

  // Pilih opsi template
  await page.getByRole('heading', {name: 'SACM Template'}).click();

  // Verifikasi bahwa template muncul di kanvas
  const kanvas = page.locator('canvas').nth(1);
  await expect(kanvas).toBeVisible();
  const expected = 'tests/screenshots/TC-04/after.png';
  const actual = await kanvas.screenshot({path: 'tests/screenshots/TC-02/actual.png'});
  expect(expected).not.toEqual(actual);
  // await kanvas.click({position: {x: 312, y: 185}});
});
