import { test, expect } from '@playwright/test';

test('Melakukan zoom in pada tampilan', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Masuk ke kanvas
  await page.getByRole('button', { name: 'Start Without Template' }).click();
  
  // Melakukan klik pada notasi
  await page.locator('div').filter({ hasText: /^Goals$/ }).first().click();

  // Screenshot sebelum zoom in
  const before = await page.screenshot({ path: 'tests/screenshots/TC-55/before.png' });

  // Melakukan zoom in
  await page.getByRole('slider').fill('2');

  // Verifikasi bahwa tampilan membesar hingga 200%
  const after = await page.screenshot({ path: 'tests/screenshots/TC-55/after.png' });
  expect(before).not.toEqual(after);

});