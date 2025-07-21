import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Use a Template' }).click();
  await page.locator('.w-full.h-full').first().click();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 79,
      y: 114
    }
  });
  await page.locator('canvas').nth(1).click({
    position: {
      x: 80,
      y: 113
    }
  });
  await page.locator('canvas').nth(1).click({
    position: {
      x: 239,
      y: 280
    }
  });
  await page.locator('canvas').nth(1).click({
    position: {
      x: 234,
      y: 273
    }
  });
  await page.locator('div').filter({ hasText: /^Connection StyleLine StyleLineInContextOfSupportedByDouble ArrowDashedDotted$/ }).nth(3).click();
  await page.getByRole('heading', { name: 'Connection Style' }).click();
  await page.getByText('Line Style').click();
  await page.getByRole('button', { name: 'SupportedBy' }).click();
});