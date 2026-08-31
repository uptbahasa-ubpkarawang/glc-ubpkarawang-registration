# Backend — Web_UPT_Bahasa_2026

Backend ini menggunakan Google Apps Script sebagai Web App dan Google Sheets sebagai database.

## A. Buat database

Di Google Drive, buka folder:

`Web_UPT_Bahasa_2026`

Buat Google Spreadsheet dengan nama:

`Registrasi_UPT_Bahasa_2026`

Tidak perlu membuat kolom secara manual; backend mempunyai fungsi `setupDatabase()`.

## B. Ambil Spreadsheet ID

Dari URL Google Sheets:

`https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`

Salin bagian `SPREADSHEET_ID`.

## C. Buat project Apps Script

Buat project Apps Script:

`Web_UPT_Bahasa_2026_API`

Tambahkan lima file:

- Code.gs
- Config.gs
- Validation.gs
- RegistrationService.gs
- Setup.gs

Salin isi file dari paket ini.

## D. Simpan Spreadsheet ID di Script Properties

Apps Script → Project Settings → Script Properties → Add script property

Key:
`SPREADSHEET_ID`

Value:
ID Spreadsheet dari langkah B.

## E. Jalankan setupDatabase

Di Apps Script pilih fungsi:

`setupDatabase`

Klik Run dan beri izin Google saat diminta.

Sheet `Peserta` akan dibuat dengan kolom:

1. ID Registrasi
2. Timestamp
3. Nama Lengkap
4. NIM
5. Program Studi
6. Angkatan
7. Nomor Telepon
8. Email
9. Peminatan Bahasa

## F. Deploy sebagai Web App

Apps Script → Deploy → New deployment → Web app

Set:
- Execute as: Me
- Who has access: Anyone

Deploy, lalu salin URL yang berakhiran `/exec`.

## G. Tes backend

Buka:

`URL_WEB_APP?action=ping`

Jika berhasil akan menerima JSON dengan:

`"success": true`

## H. Hubungkan frontend

Pada project web lokal, buka:

`assets/js/config.js`

Isi `API_URL` menggunakan URL `/exec`.

Contoh tersedia dalam `frontend-config-example.js`.

## Aturan backend

- Nama: wajib
- NIM: opsional
- Prodi: hanya 12 pilihan yang sudah ditentukan
- Angkatan: 2022–2026
- Telepon: wajib
- Email: wajib dan hanya dicek formatnya
- Email kampus TIDAK diwajibkan oleh backend
- Peminatan: hanya satu dari Inggris/Jepang/Mandarin

## Registrasi ganda

Untuk sekarang pengecekan duplikat dimatikan:

`CHECK_DUPLICATE: false`

Jika nanti ingin mencegah peserta mendaftar lebih dari sekali, ubah menjadi:

`CHECK_DUPLICATE: true`

Saat aktif, sistem membandingkan NIM (jika ada), email, dan nomor telepon.
