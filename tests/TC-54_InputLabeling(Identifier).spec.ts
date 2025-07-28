import { test, expect } from '@playwright/test';

test('Melakukan input labeling (identifier) pada notasi', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Masuk ke kanvas
  await page.getByRole('button', { name: 'Start Without Template' }).click();
  
  // Melakukan klik pada notasi
  await page.locator('div').filter({ hasText: /^Goals$/ }).first().click();

  // Screenshot sebelum input labeling (identifier)
  const target = page.locator('canvas').nth(1);
  const before = await target.screenshot({ path: 'tests/screenshots/TC-54/before.png' });

  await page.locator('canvas').nth(1).click({
    position: {
      x: 185,
      y: 143
    }
  });

  // Input Labeling (Identifier)
  await page.locator('div').filter({ hasText: /^ID Text$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^ID Text$/ }).getByRole('textbox').fill('3');

  // Verifikasi bahwa label tampil di notasi
  const after = await target.screenshot({ path: 'tests/screenshots/TC-54/after.png' });
  expect(before).not.toEqual(after);

});