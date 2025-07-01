import { test, expect } from '@playwright/test';

test('Membuat Project', async ({ page }) => {
  // Arahkan ke halaman utama
  await page.goto('http://localhost:5173/');

  // Klik tombol untuk memulai tanpa template
  await page.getByRole('button', { name: 'Start Without Template' }).click();

  // Buka dan Simpan event tab baru yang dibuka setelah mengklik "PROJECT"
  await page.getByRole('button', { name: 'PROJECT' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'New Project' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('button', { name: 'Start Without Template' }).click();

  // Verifikasi bahwa tab baru terbuka dengan URL yang sesuai
  await expect(page1).toHaveURL(/\/project/);  // Ganti dengan pola URL yang sesuai
});
