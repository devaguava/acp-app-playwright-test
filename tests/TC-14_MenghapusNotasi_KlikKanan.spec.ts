import { test, expect } from '@playwright/test';

test('Menghapus notasi di kanvas dengan menggunakan klik kanan pada notasi', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Masuk ke kanvas
  await page.getByRole('button', { name: 'Start Without Template' }).click();

  // Menambahkan notasi ke kanvas
  await page.locator('div').filter({ hasText: /^Created with Fabric\.js 4\.6\.0Artifact Reference$/ }).getByRole('img').click();

  // Screenshot sebelum penghapusan
  const target = page.locator('canvas').nth(1);
  const before = await target.screenshot({path: 'tests/screenshots/TC-14/before.png'});

  // Klik notasi yang akan dihapus pada kanvas
  await target.click({ position: {x: 180, y: 133}, button: 'right' });

  // Pilih opsi untuk menghapus di context menu
  await page.locator('div').filter({ hasText: /^Hapus Shape$/ }).nth(4).click();
  await page.waitForTimeout(500);

  // Verifikasi bahwa notasi terhapus dari kanvas
  const after = await target.screenshot({path: 'tests/screenshots/TC-14/after.png'});
  expect(before).not.toEqual(after);
});