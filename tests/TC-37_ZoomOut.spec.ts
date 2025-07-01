import { test, expect } from '@playwright/test';

test('Melakukan zoom out pada tampilan', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Masuk ke kanvas
  await page.getByRole('button', { name: 'Start Without Template' }).click();
  
  // Melakukan klik pada notasi
  await page.locator('div').filter({ hasText: /^Goals$/ }).first().click();

  // Screenshot sebelum zoom in
  const target = page.locator('canvas').nth(1);
  const before = await target.screenshot();

  // Melakukan zoom in
  await page.getByRole('slider').fill('0.1');

  // Verifikasi bahwa tampilan membesar hingga 10%
  const after = await target.screenshot();
  expect(before).not.toEqual(after);

});