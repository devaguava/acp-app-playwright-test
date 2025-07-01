import { test, expect, Locator } from '@playwright/test';
import { readFileSync } from 'fs';

test('Import file dalam format JSON melalui drag&drop', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Masuk ke kanvas
    await page.getByRole('button', { name: 'Start Without Template' }).click();
  
    // Screenshot sebelum import
    const target = page.locator('canvas').nth(1);
    const before = await target.screenshot();
  
    // Klik button import
    await page.getByRole('button', { name: 'Import' }).click();
  
    // Temukan elemen target drop berdasarkan teks
    const dropZoneLocator = page.locator('div').filter({ hasText: /^Drag and drop a file here, or$/ });
  
    // Simulasikan drag & drop file
    await dragAndDropFile(dropZoneLocator, 'tests/assets/diagram.json', 'diagram.json', 'application/json');
  
    // Verifikasi bahwa berhasil import
    const after = await target.screenshot();
    expect(before).not.toEqual(after);

});

const dragAndDropFile = async (
  targetLocator: Locator,
  filePath: string,
  fileName: string,
  fileType = 'application/octet-stream'
) => {
  const buffer = readFileSync(filePath).toString('base64');

  const dataTransferHandle = await targetLocator.page().evaluateHandle(
    async ({ bufferData, localFileName, localFileType }) => {
      const dt = new DataTransfer();

      const res = await fetch(bufferData);
      const blob = await res.blob();

      const file = new File([blob], localFileName, { type: localFileType });
      dt.items.add(file);
      return dt;
    },
    {
      bufferData: `data:${fileType};base64,${buffer}`,
      localFileName: fileName,
      localFileType: fileType,
    }
  );

  const elementHandle = await targetLocator.elementHandle();

  if (!elementHandle) {
    throw new Error('Target drop element not found');
  }

  await elementHandle.evaluate((element, dt) => {
    element.dispatchEvent(new DragEvent('drop', { dataTransfer: dt }));
  }, dataTransferHandle);
};
