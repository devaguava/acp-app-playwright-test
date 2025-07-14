import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Start Without Template' }).click();
  await page.getByRole('button', { name: 'Import' }).click();
  await page.getByText('Drag and drop file here, or click to selectSupports: .json, .xml').click();
  await page.locator('div').filter({ hasText: /^Import Diagram$/ }).getByRole('button').click();
});