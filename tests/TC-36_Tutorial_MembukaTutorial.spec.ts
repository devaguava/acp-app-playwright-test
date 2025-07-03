import { test, expect } from '@playwright/test';

test('Membuka Tutorial', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Masuk ke kanvas
  await page.getByRole('button', { name: 'Start Without Template' }).click();

  // Screenshot sebelum membuka menu App Guide
  const target = page.locator('canvas').nth(1);
  const before = await target.screenshot({ path: 'tests/screenshots/TC-36/before.png' });

  // Klik App Guide
  await page.getByRole('button', { name: 'Open app guide' }).click();
  await page.locator('iframe[title="Create Diagram"]').contentFrame().getByRole('button', { name: 'Play' }).click();
  await page.waitForTimeout(5000);
//   await page.locator('iframe[title="Create Diagram"]').contentFrame().getByRole('button', { name: 'Full screen keyboard shortcut' }).click();

  // Verifikasi bahwa berhasil membuka tutorial
  const after = await target.screenshot({ path: 'tests/screenshots/TC-36/after.png' });
  expect(before).not.toEqual(after);

});