import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Start Without Template' }).click();
  await page.getByRole('button', { name: 'Open app guide' }).click();
  await page.getByRole('textbox', { name: 'Placeholder' }).click();
  await page.getByRole('textbox', { name: 'Placeholder' }).fill('zzz');
  await page.getByText('Tidak ada video yang').click();
  await page.locator('.p-1').click();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 168,
      y: 256
    }
  });
  await page.getByRole('button', { name: 'Open notation guide' }).click();
});