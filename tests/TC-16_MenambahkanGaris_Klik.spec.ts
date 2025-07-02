import { test, expect } from '@playwright/test';
import fs from 'fs';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

test('Menambahkan garis ke kanvas dengan drag and drop menggunakan button', async ({ page }) => {

  // Arahkan ke halaman yang sesuai
  await page.goto('http://localhost:5173/');

  // Klik tombol untuk memulai tanpa template
  await page.getByRole('button', { name: 'Start Without Template' }).click();

  const beforeScreenshotPath = 'before-draw.png';
  await page.screenshot({ path: beforeScreenshotPath });

  const kanvas = page.locator('canvas').nth(1);
  const before = await kanvas.screenshot();

  // Klik tombol yang sesuai untuk memilih elemen garis (misalnya tombol untuk memilih garis)
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).click();
  await page.getByRole('button', { name: 'InContextOf' }).click();

  // Tunggu sebentar untuk memastikan elemen siap
  await page.waitForTimeout(500);

  // Ambil posisi kanvas untuk menentukan titik awal dan titik tujuan
  const canvas = page.locator('canvas').nth(1); // Mengambil kanvas kedua jika ada lebih dari satu
  const canvasBoundingBox = await canvas.boundingBox();
  if (!canvasBoundingBox) throw new Error('Canvas not found');

  // Tentukan titik pertama (misalnya posisi tengah kanvas)
  const xStart = canvasBoundingBox.x + canvasBoundingBox.width * 0.1; // 10% dari lebar kanvas
  const yStart = canvasBoundingBox.y + canvasBoundingBox.height * 0.3; // 30% dari tinggi kanvas

  // Tentukan titik kedua (misalnya posisi lebih jauh di kanvas)
  const xFinish = canvasBoundingBox.x + canvasBoundingBox.width * 0.8; // 80% dari lebar kanvas
  const yFinish = canvasBoundingBox.y + canvasBoundingBox.height * 0.7; // 70% dari tinggi kanvas

  console.log(`Start drawing from (${xStart}, ${yStart}) to (${xFinish}, ${yFinish})`);

  // Melakukan drag and drop untuk menggambar garis
  await page.mouse.move(xStart, yStart); 
  await page.mouse.down(); 
  await page.mouse.move(xFinish, yFinish); 
  await page.mouse.up(); 

  // Screenshot setelah menggambar garis untuk memverifikasi
  const afterScreenshotPath = 'after-draw.png';
  await page.screenshot({ path: afterScreenshotPath });

  // Membaca kedua gambar (sebelum dan setelah)
  const beforeImage = PNG.sync.read(fs.readFileSync(beforeScreenshotPath));
  const afterImage = PNG.sync.read(fs.readFileSync(afterScreenshotPath));
  
  const { width, height } = beforeImage;
  const diff = new PNG({ width, height });

  // Bandingkan kedua gambar pixel-by-pixel
  const numDiffPixels = pixelmatch(beforeImage.data, afterImage.data, diff.data, width, height, { threshold: 0.1 });

  console.log(`Number of different pixels: ${numDiffPixels}`);

  const after = await kanvas.screenshot();
  expect(before).not.toEqual(after);

  // Verifikasi bahwa screenshot setelah menggambar ada
  expect(afterScreenshotPath).toBeTruthy();
  
});
