# Web_UPT_Bahasa_2026

Frontend registrasi peserta peminatan bahasa UPT Bahasa 2026.

## Arsitektur

- Frontend: GitHub Pages
- Backend: Google Apps Script Web App
- Database: Google Sheets
- Penyimpanan: Google Drive

## Tema tampilan

Tampilan menggunakan nuansa internasional dengan sentuhan:
- Inggris / International: aksen biru dan elemen geometris
- Jepang: aksen merah dan nuansa sakura / lingkaran matahari
- Mandarin: aksen emas-merah dengan nuansa lantern

Tema dibuat tetap halus agar fokus utama tetap pada form registrasi.

## Data registrasi

- Nama lengkap — wajib
- NIM — opsional
- Program studi — wajib
- Angkatan — wajib
- Nomor telepon / WhatsApp — wajib
- Email — wajib
- Untuk angkatan 2022–2025 ditampilkan note agar menggunakan email kampus apabila tersedia, tetapi tidak memblokir registrasi. Angkatan 2026 tidak menampilkan note ini.
- Peminatan — wajib, hanya satu:
  - Bahasa Inggris
  - Bahasa Jepang
  - Bahasa Mandarin

## Menjalankan secara lokal

Bisa dibuka langsung melalui `index.html`, tetapi disarankan memakai ekstensi Live Server di VS Code.

## Backend

Saat ini `assets/js/config.js` memiliki `API_URL` kosong, sehingga submit berjalan dalam mode simulasi.

Setelah Google Apps Script dideploy:

```js
window.APP_CONFIG = {
  API_URL: "https://script.google.com/macros/s/DEPLOYMENT_ID/exec",
  CAMPUS_EMAIL_NOTE_START_YEAR: 2025
};
```

## Tahap berikutnya

1. Buat Google Spreadsheet database.
2. Buat Apps Script Web App.
3. Tambahkan endpoint registrasi.
4. Sambungkan `API_URL`.
5. Tambahkan validasi duplikat pada backend.
6. Ganti field Program Studi menjadi dropdown daftar prodi resmi jika daftar final sudah tersedia.


## Background ilustrasi

Versi ini sudah memakai background ilustrasi tematik langsung pada halaman web.
File background berada di:

- `assets/images/background-upt-bahasa-cultural.png`

Background menampilkan nuansa:
- English / international
- Japanese
- Mandarin / Chinese

dengan area tengah yang tetap cukup bersih agar form registrasi tetap nyaman dibaca.


## Backend aktif

Frontend sudah dikonfigurasi menggunakan Google Apps Script Web App:

`https://script.google.com/macros/s/AKfycbzE9YkOaKnQ1e9O8QQ2wyv_KC6UmLnBrtibpKsXzseni1szhVKXt-cVvHGfKfBnls2t/exec`

Saat submit berhasil, modal akan menampilkan ID registrasi yang dikembalikan backend.
Source Apps Script juga disertakan pada folder `apps-script/`.
