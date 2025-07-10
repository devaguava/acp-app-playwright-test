import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Start Without Template' }).click();
  await page.locator('div').filter({ hasText: /^Goals$/ }).first().click();
  await page.locator('div').filter({ hasText: /^ID Text$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^ID Text$/ }).getByRole('textbox').fill('1');
  await page.getByRole('button', { name: 'Normal' }).first().click();
  await page.getByRole('button', { name: 'Loose' }).click();
  await page.getByRole('button', { name: 'Normal' }).first().click();
  await page.getByRole('button', { name: 'Bold' }).click();
  await page.getByRole('button', { name: 'Select option' }).first().click();
  await page.getByRole('button', { name: '18px' }).click();
  await page.locator('div').filter({ hasText: /^Value$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Value$/ }).getByRole('textbox').fill('adfdsf');
  await page.locator('div').filter({ hasText: /^Line SpacingNormal$/ }).getByRole('button').click();
  await page.getByRole('button', { name: 'Loose' }).nth(1).click();
  await page.getByRole('button', { name: 'Normal' }).click();
  await page.getByRole('button', { name: 'Bold' }).nth(1).click();
  await page.getByRole('button', { name: 'Select option' }).click();
  await page.getByRole('button', { name: '18px' }).nth(1).click();
  await page.getByRole('button', { name: '18px' }).nth(1).click();
  await page.locator('div').filter({ hasText: /^18px$/ }).getByRole('button').click();
  await page.getByRole('button', { name: '18px' }).first().click();
});