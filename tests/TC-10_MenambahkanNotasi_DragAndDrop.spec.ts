 import { test, expect } from '@playwright/test';

test('Menambahkan notasi baru ke kanvas dengan melakukan drag and drop', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Masuk ke kanvas
  await page.getByRole('button', {name: 'Start Without Template'}).click();

  // Screenshot sebelum menambahkan notasi
  const target = page.locator('canvas').nth(1);
  const before = await target.screenshot({path: 'tests/screenshots/TC-12/before.png'});

  // Lokator elemen notasi yang akan di drag
  const notasi = page.getByText('Goals').first();

  // Lokasi tujuan di kanvas
  const kanvas = page.locator('canvas').nth(1);
  const box = await kanvas.boundingBox();

  if (!box) throw Error('Canvas not found');

  // Drag and drop notasi ke titik tertentu di kanvas
  const notasiBox = await notasi.boundingBox();
  if (!notasiBox) throw new Error('Notation not found');

  await page.mouse.move(notasiBox.x + notasiBox.width / 2, notasiBox.y + notasiBox.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + 250, box.y + 150);
  await page.mouse.up();

  // Verifikasi bahwa notasi muncul di kanvas
  await expect(kanvas).toBeVisible();

  const after = await target.screenshot({path: 'tests/screenshots/TC-12/after.png'});
  expect(before).not.toEqual(after);
});
