import { test, expect } from '@playwright/test';

test('Menghapus garis di kanvas dengan menggunakan klik kanan pada garis', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Masuk ke kanvas menggunakan template
  await page.getByRole('button', { name: 'Use a Template' }).click();
  await page.getByText('GSN TemplateStart with a pre-').click();

  // Screenshot sebelum penghapusan
  const target = page.locator('canvas').nth(1);
  const before = await target.screenshot();

  // Klik notasi yang akan dihapus pada kanvas
  await page.locator('canvas').nth(1).click({
    button: 'right',
    position: {
      x: 315,
      y: 180
    }
  });

  // Pilih opsi untuk menghapus di context menu
  await page.locator('div').filter({ hasText: /^Delete Connection$/ }).nth(4).click();
  await page.waitForTimeout(500);

  // Klik notasi yang akan dihapus pada kanvas
  await page.locator('canvas').nth(1).click({
    button: 'right',
    position: {
      x: 438,
      y: 88
    }
  });

  // Pilih opsi untuk menghapus di context menu
  await page.locator('div').filter({ hasText: /^Delete Connection$/ }).nth(4).click();
  await page.waitForTimeout(500);

  // Verifikasi bahwa notasi terhapus dari kanvas
  const after = await target.screenshot();
  expect(before).not.toEqual(after);
});