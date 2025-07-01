import { test, expect } from '@playwright/test';

test('Menambahkan garis antar notasi', async ({ page }) => {
  // Arahkan ke halaman
  await page.goto('http://localhost:5173/');
  
  // Klik untuk menggunakan template
  await page.getByRole('button', { name: 'Use a Template' }).click();
  await page.getByText('GSN TemplateStart with a pre-').click();

  // Menunggu kanvas siap
  const canvas = page.locator('canvas').nth(1);
  await expect(canvas).toBeVisible();

  // Menghubungkan dua notasi dengan klik ujung notasi pertama dan kedua
  await canvas.click({
    position: { x: 314, y: 126 }
  });

  await canvas.click({
    position: { x: 315, y: 248 }
  });

  // Klik pada garis yang muncul untuk mengaktifkan pengaturan
  await canvas.click({
    position: { x: 314, y: 203 }
  });

  // Verifikasi bahwa pengaturan garis muncul di panel kanan
  const lineSettingsPanel = page.getByText('Line Style');
  await expect(lineSettingsPanel).toBeVisible();

});
