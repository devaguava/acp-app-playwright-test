import { test, expect } from '@playwright/test';

test('Mengedit notasi dengan menambahkan teks dan mengubah font pada notasi', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Masuk ke kanvas
  await page.getByRole('button', { name: 'Start Without Template' }).click();

  // Menambahkan notasi ke kanvas
  await page.locator('div').filter({ hasText: /^Goals$/ }).first().click();

  // Menambahkan Identifier dan Deskripsi pada notasi
  await page.locator('div').filter({ hasText: /^ID Text$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^ID Text$/ }).getByRole('textbox').fill('1');
  await page.locator('div').filter({ hasText: /^Value$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Value$/ }).getByRole('textbox').fill('Ini Goal');

  // Screenshot kanvas sebelum diedit
  const kanvas = page.locator('canvas').nth(1);
  const before = await kanvas.screenshot();

  // Mengedit Identifier notasi
  await page.getByRole('button', { name: 'Normal' }).first().click();
  await page.getByRole('button', { name: 'Loose' }).click();
  await page.getByRole('button', { name: 'Normal' }).first().click();
  await page.getByRole('button', { name: 'Bold' }).click();
  await page.getByRole('button', { name: 'Select option' }).first().click();
  await page.getByRole('button', { name: '18px' }).click();

  // Mengedit Deskripsi notasi
  await page.locator('div').filter({ hasText: /^Line SpacingNormal$/ }).getByRole('button').click();
  await page.getByRole('button', { name: 'Loose' }).nth(1).click();
  await page.getByRole('button', { name: 'Normal' }).click();
  await page.getByRole('button', { name: 'Bold' }).nth(1).click();
  await page.getByRole('button', { name: 'Select option' }).click();
  await page.getByRole('button', { name: '20px' }).click();

  await page.waitForTimeout(500);

  // Verifikasi bahwa font berhasil diedit
  const after = await kanvas.screenshot();
  expect(before).not.toEqual(after);
  
});