import { test, expect } from '@playwright/test';
import fs from 'fs';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

test('Menambahkan garis pada kanvas dengan melakukan klik pada icon garis di ribbon', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Masuk ke kanvas
  await page.getByRole('button', {name: 'Start Without Template'}).click();

  // Memilih garis
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).click();
  await page.getByRole('button', { name: 'InContextOf' }).click();
  await page.waitForTimeout(1000);

  const canvas = page.locator('canvas').nth(1);
  const canvasBox = await canvas.boundingBox();
  if (!canvasBox) throw new Error('Canvas tidak ditemukan');

  // Titik di dalam canvas
  const relativeStart = { x: 142, y: 112 };
  const relativeEnd = { x: 359, y: 337 };

  // Konversi ke posisi
  const xStart = canvasBox.x + relativeStart.x;
  const yStart = canvasBox.y + relativeStart.y;
  const xEnd = canvasBox.x + relativeEnd.x;
  const yEnd = canvasBox.y + relativeEnd.y;

  console.log(`Click & drag from (${xStart}, ${yStart}) to (${xEnd}, ${yEnd})`);

  // Screenshot sebelum
  const beforePath = 'tests/screenshots/TC-16/before.png';
  await canvas.screenshot({ path: beforePath });
  const before = await canvas.screenshot();

  // 7. Simulasikan klik-tahan-lepas
  await page.mouse.move(xStart, yStart);
  await page.mouse.down(); // klik & tahan
  await page.waitForTimeout(100);
  await page.mouse.move(xEnd, yEnd, { steps: 30 }); // gerakan smooth
  await page.waitForTimeout(100);
  await page.mouse.up(); // lepas klik
  await page.waitForTimeout(1000); // tunggu render selesai

  // Screenshot sesudah
  const afterPath = 'tests/screenshots/TC-16/after.png';
  await canvas.screenshot({ path: afterPath });

  const after = await canvas.screenshot();
  expect(before).not.toEqual(after);

  // Membandingkan hasilnya
  const beforeImage = PNG.sync.read(fs.readFileSync(beforePath));
  const afterImage = PNG.sync.read(fs.readFileSync(afterPath));
  const { width, height } = beforeImage;
  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatch(
    beforeImage.data,
    afterImage.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 }
  );

  console.log(`Perbedaan pixel: ${numDiffPixels}`);
  expect(numDiffPixels).toBeGreaterThan(0);
});
