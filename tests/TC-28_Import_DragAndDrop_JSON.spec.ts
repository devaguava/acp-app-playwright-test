import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test('Import file dalam format JSON melalui drag&drop', async ({ page }) => {
  const downloadsDir = path.resolve('downloads');
      if (!fs.existsSync(downloadsDir)) {
        fs.mkdirSync(downloadsDir);
      }
  
    await page.goto('http://localhost:5173/');
    
    // Masuk kanvas
    await page.getByRole('button', {name: 'Use a Template'}).click();
  
    // Pilih opsi template
    await page.getByRole('heading', {name: 'GSN Template'}).click();

  const target = page.locator('canvas').nth(1);
  const before = await target.screenshot({path: 'tests/screenshots/TC-28/before.png'});

  // Melakukan export
    await page.getByRole('button', { name: 'Export' }).click();
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'JSON' }).click();
    const download = await downloadPromise;
    const tempPath = await download.path();
    expect(tempPath).not.toBeNull();
    const fileName = download.suggestedFilename();
    expect(fileName).toMatch(/diagram.*\.json$/);
    const savePath = path.resolve(downloadsDir, fileName);
    await download.saveAs(savePath);
  
    // Kosongkan canvas
    await page.locator('body').press('Control+A');
    await page.keyboard.press('Backspace');

  // Klik tombol Import untuk membuka drop zone
  await page.getByRole('button', { name: 'Import' }).click();

  // Drop zone yang akan digunakan untuk drag and drop
  const dropZoneLocator = page.locator('div').filter({ hasText: /^Drag and drop file here, or click to selectSupports: \.json, \.xml$/ }).getByRole('img');
  // Pastikan drop zone terlihat
  await expect(dropZoneLocator).toBeVisible();

  // Menyiapkan file format invalid yang ingin di-upload
  const filePath = path.join(process.cwd(), 'downloads', 'diagram.json');
  console.log('File exists?', fs.existsSync(filePath));
  
  // Mensimulasikan upload file ke dalam input file tersembunyi di dalam drop zone
  const fileInputLocator = page.locator('input[type="file"]');
  
  // Upload file ke elemen input file
  await fileInputLocator.setInputFiles(filePath);
  await page.waitForTimeout(5000);

  // Screenshot setelah upload file
  const after = await target.screenshot({ path: 'tests/screenshots/TC-28/after.png' });
  expect(before).toEqual(after);

});
