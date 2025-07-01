import { test, expect } from '@playwright/test';

test('Melakukan input labeling (identifier) pada notasi', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Masuk ke kanvas
  await page.getByRole('button', { name: 'Start Without Template' }).click();
  
  // Melakukan klik pada notasi
  await page.locator('div').filter({ hasText: /^Goals$/ }).first().click();

  // Screenshot sebelum input labeling (identifier)
  const target = page.locator('canvas').nth(1);
  const before = await target.screenshot();

  // Input Labeling (Identifier)
  await page.locator('div').filter({ hasText: /^ID Text$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^ID Text$/ }).getByRole('textbox').fill('1');

  // Verifikasi bahwa label tampil di notasi
  const after = await target.screenshot();
  expect(before).not.toEqual(after);

});