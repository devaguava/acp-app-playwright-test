import { test, expect } from '@playwright/test';

test('Menggunakan Prompt AI untuk generate diagram SACM', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Masuk ke kanvas
  await page.getByRole('button', { name: 'Start Without Template' }).click();
  
  // Masuk ke halaman prompting melalui Tab AI
  await page.getByRole('button', { name: 'AI' }).click();
  const page1Promise = page.waitForEvent('popup');

  // Klik button untuk get token API Token dari GitHub
  await page.getByRole('button', { name: 'Get Token' }).click();
  const page1 = await page1Promise;

  // Login GitHub dan get API Token
  await page1.getByRole('textbox', { name: 'Username or email address' }).fill('devaguava22@gmail.com');
  await page1.getByRole('textbox', { name: 'Password' }).click();
  await page1.getByRole('textbox', { name: 'Password' }).fill('Telyu123421!');
  await page1.getByRole('button', { name: 'Sign in', exact: true }).click();

  // Masukkan API Token
  await page.getByRole('textbox', { name: 'API Token' }).click();
  await page.getByRole('textbox', { name: 'API Token' }).fill('sk-yNbja6nxOAdDdYKsV1CodwVUz7Uo7c0Za7gdS9rTjoY2Q58v');
  await page.getByRole('button', { name: 'Submit' }).click();

  // Screenshot sebelum penggunaan Prompt AI
//   const target = page.locator('canvas').nth(1);
//   const before = await target.screenshot({path: 'tests/screenshots/TC-07/before.png'});

  // Menggunakan fitur Prompt AI untuk cek apakah bisa lewat dari 800 karakter
  await page.getByRole('textbox', { name: 'Ask about your diagram...' }).click();
  await page.getByRole('textbox', { name: 'Ask about your diagram...' }).fill('Sub-Goal 3 (G1.3): Subsistem Aktuasi AmanDeskripsi:Aktuasi meliputi sistem pengereman, kemudi, dan akselerasi yang menerjemahkan keputusan sistem menjadi aksi mekanis di kendaraan. Kegagalan di subsistem ini dapat langsung menyebabkan kecelakaan serius.Solusi untuk G1.3 (Sn1.3):Untuk menjamin keselamatan, sistem aktuasi telah dilengkapi dengan:•Redundansi perangkat keras: seperti dua jalur sistem pengereman dan dua motor kemudi.•Mekanisme fail-safe: seperti pemantauan kesehatan aktuator dan aktivasi mode berhenti aman jika kegagalan terdeteksi.Validasi dilakukan melalui:•Uji injeksi fault untuk memastikan sistem tetap aman saat terjadi kesalahan.•Pengujian fisik dengan mensimulasikan kegagalan komponen.•Uji jangka panjang untuk menilai keandalan aktuator dalam kondisi operasional nyatanyaa.');
  await page.locator('.p-4 > .relative > button').click();

  // Verifikasi bahwa sistem berhasil generate diagram
  await page.waitForTimeout(5000);
  await expect(page.getByText('Your message is too long.')).toBeVisible({ timeout: 10000 });

//   const after = await target.screenshot({path: 'tests/screenshots/TC-07/after.png'});
//   expect(before).toEqual(after);

});