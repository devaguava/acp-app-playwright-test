import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Start Without Template' }).click();
  await page.getByRole('textbox', { name: 'Search Shapes' }).click();
  await page.getByRole('textbox', { name: 'Search Shapes' }).fill('acp');
  await page.getByText('Tidak ada hasil yang ditemukan').click();
});