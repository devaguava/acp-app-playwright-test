import { test, expect } from '@playwright/test';

test('Menggunakan Prompt AI untuk generate diagram SACM', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Masuk ke kanvas
  await page.getByRole('button', { name: 'Start Without Template' }).click();
  
  // Masuk ke halaman prompting melalui Tab AI
  await page.getByRole('button', { name: 'AI' }).click();

  // Screenshot sebelum penggunaan shortcut
  const target = page.locator('canvas').nth(1);
  const before = await target.screenshot({path: 'tests/screenshots/TC-06/before.png'});

  // Menggunakan fitur Prompt AI untuk generate diagram GSN
  await page.getByRole('textbox', { name: 'Ask about your diagram...' }).click();
  await page.getByRole('textbox', { name: 'Ask about your diagram...' }).fill('Buatlah diagram SACM (Structured Assurance Case Metamodel) untuk menyatakan bahwa sistem diagnosis kesehatan online cukup andal untuk mendukung pengambilan keputusan klinis •\tKlaim utama: Sistem diagnosis kesehatan online cukup andal untuk mendukung pengambilan keputusan klinis •\tKlaim ini didukung oleh tiga sub-klaim •\tKlasifikasi gejala masukan cukup akurat •\tBasis pengetahuan medis selalu diperbarui dan tervalidasi •\tMesin rekomendasi tangguh dan dapat dijelaskan •\tArgument Reasoning untuk Klaim 1: Telah divalidasi menggunakan dataset klinis berskala besar dengan akurasi 95% •\tEvidence untuk Klaim 1: Laporan evaluasi: performa klasifikasi pada dataset gejala dunia nyata •\tKonteks: Asumsinya, pengguna memasukkan gejala dengan akurat •\tAsumsi: Koneksi internet stabil agar tidak terjadi pengiriman data parsial •\tBukti Klaim 2: Basis pengetahuan dikurasi oleh tenaga medis bersertifikat dan ditinjau setiap tiga bulan •\tJustifikasi: Keamanan medis bergantung pada sumber data yang terverifikasi dan terpelihara •\tBukti Klaim 3: Telah diuji terhadap kasus ekstrem dan input yang bersifat menyerang (adversarial)');
  await page.locator('.absolute').click();

  // Verifikasi bahwa sistem berhasil generate diagram
  await page.waitForTimeout(5000);
  await expect(page.getByText(/SACM/)).toBeVisible({ timeout: 10000 });

  const after = await target.screenshot({path: 'tests/screenshots/TC-06/after.png'});
  expect(before).not.toEqual(after);

});