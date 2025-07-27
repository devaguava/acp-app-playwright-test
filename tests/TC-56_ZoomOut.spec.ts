import { test, expect } from '@playwright/test';

test('Melakukan zoom out tampilan kanvas', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Masuk ke kanvas
  await page.getByRole('button', { name: 'Start Without Template' }).click();
  
  // Melakukan klik pada notasi
  await page.locator('div').filter({ hasText: /^Goals$/ }).first().click();

  // Screenshot sebelum zoom in
  const before = await page.screenshot({ path: 'tests/screenshots/TC-56/before.png' });

  // Melakukan zoom in
  await page.getByRole('slider').fill('0.1');

  // Verifikasi bahwa tampilan mengecil hingga 10%
  const after = await page.screenshot({ path: 'tests/screenshots/TC-56/after.png' });
  expect(before).not.toEqual(after);

});