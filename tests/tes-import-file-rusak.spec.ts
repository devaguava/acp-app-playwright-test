import { test, expect } from '@playwright/test';
import path from 'path';

test('Import file PDF yang rusak', async ({ page }) => {

  // 1. Membuka halaman web
  await page.goto('http://localhost:5173/');

  // 2. Klik tombol untuk memulai tanpa template
  await page.getByRole('button', { name: 'Start Without Template' }).click();

  // 3. Klik tombol Import untuk membuka drop zone
  await page.getByRole('button', { name: 'Import' }).click();

  // 4. Tentukan file rusak yang akan di-upload (misalnya file PDF yang rusak)
  const corruptFilePath = path.join(process.cwd(), 'tests', 'assets', 'corrupt_file.pdf'); // Path ke file PDF yang rusak
  
  // 5. Mensimulasikan upload file ke dalam input file
  const fileInputLocator = page.locator('input[type="file"]'); // Menemukan elemen input file tersembunyi
  
  // 6. Upload file rusak
  await fileInputLocator.setInputFiles(corruptFilePath); // Memasang file rusak ke elemen input file

  // 7. Menunggu dan memeriksa apakah pesan kesalahan muncul di bawah drop zone
  const errorMessageSelector = 'div:has-text("unsupported file format")'; // Menemukan <div> yang berisi pesan kesalahan
  
  // Menunggu pesan kesalahan dalam div muncul
  const errorMessageLocator = page.locator(errorMessageSelector);
  
  // Menunggu elemen pesan kesalahan muncul dan memastikan elemen tersebut terlihat
  await expect(errorMessageLocator).toBeVisible({ timeout: 10000 }); // Menunggu lebih lama jika perlu
  
  // Verifikasi bahwa pesan error muncul
  const errorMessage = await errorMessageLocator.isVisible();
  expect(errorMessage).toBeTruthy(); // Memastikan elemen dengan pesan error ditemukan

  // 8. Ambil screenshot setelah mencoba meng-upload file rusak
  await page.screenshot({ path: 'tests/screenshots/TC-29/corrupt-file-uploaded.png' });

});
