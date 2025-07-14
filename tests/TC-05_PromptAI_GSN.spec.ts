import { test, expect } from '@playwright/test';

test('Menggunakan Prompt AI untuk generate diagram GSN', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Masuk ke kanvas
  await page.getByRole('button', { name: 'Start Without Template' }).click();
  
  // Masuk ke halaman prompting melalui Tab AI
  await page.getByRole('button', { name: 'AI' }).click();

  // Screenshot sebelum penggunaan shortcut
  const target = page.locator('canvas').nth(1);
  const before = await target.screenshot({path: 'tests/screenshots/TC-05/before.png'});

  // Menggunakan fitur Prompt AI untuk generate diagram GSN
  await page.getByRole('textbox', { name: 'Ask about your diagram...' }).click();
  await page.getByRole('textbox', { name: 'Ask about your diagram...' }).fill('create GSN diagram');
  await page.locator('.absolute').click();

  // Verifikasi bahwa sistem berhasil generate diagram
  await page.waitForTimeout(5000);
  await expect(page.getByText(/GSN/)).toBeVisible({ timeout: 10000 });

  const after = await target.screenshot({path: 'tests/screenshots/TC-05/after.png'});
  expect(before).not.toEqual(after);

});