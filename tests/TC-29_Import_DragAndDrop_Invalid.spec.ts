import { test, expect } from '@playwright/test';
import path from 'path';

test('Import file dengan melakukan drag&drop file dalam format selain JSON dan XML (Invalid)', async ({ page }) => {

  // Membuka halaman web
  await page.goto('http://localhost:5173/');

  // Masuk kanvas
  await page.getByRole('button', { name: 'Start Without Template' }).click();

  // Klik tombol Import untuk membuka drop zone
  await page.getByRole('button', { name: 'Import' }).click();

  // Drop zone yang akan digunakan untuk drag and drop
  const dropZoneLocator = page.getByText(/drag and drop/i);
  // Pastikan drop zone terlihat
  await expect(dropZoneLocator).toBeVisible();

  // Menyiapkan file format invalid yang ingin di-upload
  const filePath = path.join(process.cwd(), 'tests', 'assets', 'diagram.pdf');
  
  // Mensimulasikan upload file ke dalam input file tersembunyi di dalam drop zone
  const fileInputLocator = page.locator('input[type="file"]');
  
  // Upload file ke elemen input file
  await fileInputLocator.setInputFiles(filePath);

  // Menunggu dan memeriksa apakah pesan kesalahan muncul
  const errorMessageLocator = page.getByText('Unsupported file format.');
  
  // Verifikasi bahwa pesan error muncul setelah meng-upload file
  await expect(errorMessageLocator).toBeVisible();

  // Screenshot setelah upload file
  await page.screenshot({ path: 'tests/screenshots/TC-29/after.png' });

});
