import { test, expect } from '@playwright/test';

test('Import file dalam format JSON melalui klik button', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Masuk ke kanvas
  await page.getByRole('button', { name: 'Start Without Template' }).click();

  // Screenshot sebelum import
  const target = page.locator('canvas').nth(1);
  const before = await target.screenshot();

  // Klik import
  await page.getByRole('button', { name: 'Import' }).click();
  await page.getByRole('button', { name: 'JSON' }).click();
  await page.setInputFiles('input[type="file"]', 'tests/assets/diagram.json');

  // Verifikasi bahwa import berhasil
  await expect(page.getByText('Goals')).toBeVisible();
  const after = await target.screenshot();
  expect(before).not.toEqual(after);

});