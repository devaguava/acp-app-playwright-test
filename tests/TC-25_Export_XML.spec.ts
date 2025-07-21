import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test('Export file dalam format XML', async ({ page }) => {
  // Buat folder downloads jika belum ada
  const downloadsDir = path.resolve('downloads');
  if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir);
  }

  // Buka aplikasi
  await page.goto('http://localhost:5173/');

  // Masuk ke kanvas
  await page.getByRole('button', { name: 'Start Without Template' }).click();

  // Pilih notasi Goals
  await page.getByText('Goals').click();

  // Klik tombol Export
  await page.getByRole('button', { name: 'Export' }).click();

  // Siapkan event listener untuk download
  const downloadPromise = page.waitForEvent('download');

  // Klik tombol XML
  await page.getByRole('button', { name: 'XML' }).click();
  await page.waitForTimeout(100);
  await page.screenshot({path: 'tests/screenshots/TC-25/process.png'});

  // Tunggu file download
  const download = await downloadPromise;

  // Verifikasi bahwa path file tidak null (download berhasil)
  const tempPath = await download.path();
  expect(tempPath).not.toBeNull();

  // Dapatkan nama file
  const fileName = download.suggestedFilename();
  expect(fileName).toMatch(/diagram.*\.xml$/);

  // Simpan file ke direktori 'downloads'
  const savePath = path.resolve(downloadsDir, fileName);
  await download.saveAs(savePath);

  // Cek bahwa file benar-benar tersimpan
  expect(fs.existsSync(savePath)).toBe(true);

  // Cek ukuran file (> 0)
  const stats = fs.statSync(savePath);
  expect(stats.size).toBeGreaterThan(0);

  // Baca isi file dan verifikasi apakah header sesuai dengan standar XML
  const content = fs.readFileSync(savePath, 'utf-8').trim();
  expect(content.startsWith('<?xml')).toBe(true);

});
