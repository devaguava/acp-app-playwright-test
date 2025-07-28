import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Start Without Template' }).click();
  await page.locator('div').filter({ hasText: /^Goals$/ }).first().click();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 221,
      y: 167
    }
  });
  await page.locator('div').filter({ hasText: /^ID Text$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^ID Text$/ }).getByRole('textbox').fill('1');
  await page.locator('div').filter({ hasText: /^ID Text$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Value$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Value$/ }).getByRole('textbox').fill('ini goal');
  await page.locator('canvas').nth(1).click({
    position: {
      x: 205,
      y: 144
    }
  });
  await page.locator('.w-full.h-16 > svg').first().click();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 245,
      y: 153
    }
  });
  await page.locator('body').press('ControlOrMeta+c');
  await page.locator('canvas').nth(1).click({
    position: {
      x: 119,
      y: 53
    }
  });
  await page.getByRole('button', { name: 'EDIT' }).click();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 333,
      y: 66
    }
  });
  await page.locator('canvas').nth(1).click({
    position: {
      x: 176,
      y: 132
    }
  });
  await page.getByRole('button', { name: 'EDIT' }).click();
  await page.getByRole('button', { name: 'Copy Ctrl+C' }).click();
  await page.getByRole('button', { name: 'EDIT' }).click();
  await page.getByRole('button', { name: 'Paste Ctrl+V' }).click();
  await page.getByRole('button', { name: 'EDIT' }).click();
  await page.getByRole('button', { name: 'Paste Ctrl+V' }).click();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 131,
      y: 42
    }
  });
  await page.locator('canvas').nth(1).click({
    position: {
      x: 88,
      y: 43
    }
  });
  await page.locator('canvas').nth(1).click({
    position: {
      x: 200,
      y: 145
    }
  });
  await page.getByRole('button', { name: 'EDIT' }).click();
  await page.getByRole('button', { name: 'Duplicate Ctrl+D' }).click();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 77,
      y: 57
    }
  });
  await page.getByRole('button', { name: 'EDIT' }).click();
  await page.getByRole('button', { name: 'Cut Ctrl+X' }).click();
  await page.locator('canvas').nth(1).click({
    position: {
      x: 185,
      y: 143
    }
  });
  await page.getByRole('button', { name: 'EDIT' }).click();
});