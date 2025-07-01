import { test, expect } from '@playwright/test';

test('Mengedit garis dengna mengubah arrowhead-nya', async ({ page }) => {
  // Arahkan ke halaman
  await page.goto('http://localhost:5173/');
  
  // Klik untuk menggunakan template
  await page.getByRole('button', { name: 'Use a Template' }).click();
  await page.getByText('GSN TemplateStart with a pre-').click();

  // Menunggu kanvas siap
  const canvas = page.locator('canvas').nth(1);
  await expect(canvas).toBeVisible();

  // Screenshot kanvas sebelum melakukan pengeditan pada garis
  const before = await page.locator('canvas').nth(1).screenshot();

  // Menghubungkan dua notasi dengan klik ujung notasi pertama dan kedua
  await canvas.click({
    position: { x: 314, y: 126 }
  });

  await canvas.click({
    position: { x: 315, y: 248 }
  });

  // Klik pada garis untuk mengaktifkan pengaturan
  await canvas.click({
    position: { x: 314, y: 203 }
  });

  // Memastikan pengaturan garis muncul di panel kanan
  const lineSettingsPanel = page.getByText('Line Style');
  await expect(lineSettingsPanel).toBeVisible();

  // Klik dropdown untuk memunculkan opsi garis lain
  await page.getByRole('button', { name: 'Line' }).click();

  // Klik opsi garis lain 
  await page.getByRole('button', { name: 'InContextOf'}).click(); 

  // Klik pada garis untuk mengaktifkan pengaturan
  await canvas.click({
    position: {
      x: 465,
      y: 88
    }
  });

  // Klik dropdown untuk memunculkan opsi garis lain
  await page.getByRole('button', { name: 'Line' }).click();

  // Klik opsi garis lain 
  await page.getByRole('button', { name: 'SupportedBy'}).click(); 

  // Screenshot kanvas setelah melakukan pengeditan pada garis
  const after = await page.locator('canvas').nth(1).screenshot();

  // Verifikasi bahwa garis berhasil diedit
  expect(before).not.toEqual(after);

});
