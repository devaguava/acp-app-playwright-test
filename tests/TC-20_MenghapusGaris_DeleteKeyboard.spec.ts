import { test, expect } from '@playwright/test';

test('Menghapus notasi di kanvas dengan menggunakan tombol delete pada keyboard', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Masuk ke kanvas menggunakan template
  await page.getByRole('button', { name: 'Use a Template' }).click();
  await page.getByText('GSN TemplateStart with a pre-').click();
  
  // Screenshot sebelum penghapusan
  const target = page.locator('canvas').nth(1);
  const before = await target.screenshot();
  
  // Klik garis yang akan dihapus pada kanvas
  await target.click({ position: { x: 314, y: 203 } });

  // Tekan tombol Delete untuk menghapus garis
  await page.keyboard.press('Delete');
  await page.waitForTimeout(500);

  // Verifikasi bahwa garis terhapus dari kanvas
  const after = await target.screenshot();
  expect(before).not.toEqual(after);

});