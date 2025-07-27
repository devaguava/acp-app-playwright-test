import { test, expect } from '@playwright/test';

test('Menghapus garis di kanvas dengan menggunakan tombol backspace pada keyboard', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Masuk ke kanvas menggunakan template
  await page.getByRole('button', { name: 'Use a Template' }).click();
  await page.getByText('GSN TemplateStart with a pre-').click();
  
  // Screenshot sebelum penghapusan
  const target = page.locator('canvas').nth(1);
  const before = await target.screenshot({path: 'tests/screenshots/TC-19/before.png'});
  
  // Klik garis yang akan dihapus pada kanvas
  await target.click({ position: { x: 314, y: 203 } });

  // Tekan tombol Backspace untuk menghapus garis
  await page.keyboard.press('Backspace');
  await page.waitForTimeout(500);

  // Verifikasi bahwa garis terhapus dari kanvas
  const after = await target.screenshot({path: 'tests/screenshots/TC-19/after.png'});
  expect(before).not.toEqual(after);

});