import { test, expect } from '@playwright/test';

test('Import file dalam format XML melalui klik pada area drag&drop', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Masuk ke kanvas
  await page.getByRole('button', { name: 'Start Without Template' }).click();

  // Screenshot sebelum import
  const target = page.locator('canvas').nth(1);
  const before = await target.screenshot({ path: 'tests/screenshots/TC-31/before.png' });

  // Klik import
  await page.getByRole('button', { name: 'Import' }).click();
  await page.getByText('Drag and drop file here, or click to selectSupports: .json, .xml').click();
  await page.setInputFiles('input[type="file"]', 'tests/assets/diagram.xml');
  await page.waitForTimeout(10000);

  // Verifikasi bahwa import berhasil
  const after = await target.screenshot({ path: 'tests/screenshots/TC-31/after.png' });
  expect(before).not.toEqual(after);

});