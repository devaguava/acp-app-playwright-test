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
  await page.getByRole('textbox', { name: 'Ask about your diagram...' }).fill('Buatlah diagram GSN (Goal Structuring Notation) untuk menyatakan bahwa perangkat lunak kendaraan otonom aman digunakan di jalan umum •\tGoal utama: Sistem kendaraan otonom aman untuk digunakan secara publik •\tStrategi: Membagi argumen ke dalam subsistem persepsi, pengambilan keputusan, dan aktuasi •\tSub-Goal 1: Subsistem persepsi aman •\tSolusi: Subsistem persepsi telah lolos semua pengujian verifikasi dan validasi dalam kondisi yang ditentukan •\tKonteks: Persyaratan keselamatan untuk subsistem persepsi •\tAsumsi: Input sensor tidak terpengaruh oleh cuaca ekstrem di luar domain operasional •\tSub-Goal 2: Subsistem pengambilan keputusan aman •\tSolusi: Verifikasi formal menunjukkan algoritma pengambilan keputusan sesuai dengan batasan keselamatan •\tKonteks: Spesifikasi formal dari batasan keselamatan pengambilan keputusan •\tSub-Goal 3: Subsistem aktuasi aman Solusi: Redundansi perangkat keras dan mekanisme fail-safe telah diuji dan divalidasi •\tJustifikasi: Pendekatan membagi sistem berdasarkan fungsi merupakan strategi yang valid dalam argumen keselamatan •\tKonteks Goal utama: Sistem beroperasi dalam ODD (Operational Design Domain) sesuai standar ISO');
  await page.locator('.absolute').click();

  // Verifikasi bahwa sistem berhasil generate diagram
  await page.waitForTimeout(5000);
  await expect(page.getByText(/GSN/)).toBeVisible({ timeout: 10000 });

  const after = await target.screenshot({path: 'tests/screenshots/TC-05/after.png'});
  expect(before).not.toEqual(after);

});