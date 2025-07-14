import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test('Import file dalam format XML melalui klik pada area drag&drop', async ({ page }) => {
  const downloadsDir = path.resolve('downloads');
      if (!fs.existsSync(downloadsDir)) {
        fs.mkdirSync(downloadsDir);
      }
  
  await page.goto('http://localhost:5173/');
    
  // Masuk kanvas
  await page.getByRole('button', {name: 'Use a Template'}).click();
  
  // Pilih opsi template
  await page.getByRole('heading', {name: 'GSN Template'}).click();
  
  // Screenshot sebelum import
  const target = page.locator('canvas').nth(1);
  const before = await target.screenshot({ path: 'tests/screenshots/TC-31/before.png' });

  // Melakukan export
  await page.getByRole('button', { name: 'Export' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'XML' }).click();
  const download = await downloadPromise;
  const tempPath = await download.path();
  expect(tempPath).not.toBeNull();
  const fileName = download.suggestedFilename();
  expect(fileName).toMatch(/diagram.*\.xml$/);
  const savePath = path.resolve(downloadsDir, fileName);
  await download.saveAs(savePath);
  
  // Kosongkan canvas
  await page.locator('body').press('Control+A');
  await page.keyboard.press('Backspace');

  // Klik import
  await page.getByRole('button', { name: 'Import' }).click();
  await page.getByText('Drag and drop file here, or click to selectSupports: .json, .xml').click();
  await page.setInputFiles('input[type="file"]', './downloads/diagram.XML');
  await page.waitForTimeout(10000);

  // Verifikasi bahwa import berhasil
  const after = await target.screenshot({ path: 'tests/screenshots/TC-31/after.png' });
  expect(before).toEqual(after);

});