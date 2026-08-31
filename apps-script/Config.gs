const APP_CONFIG = Object.freeze({
  SHEET_NAME: 'Peserta',
  REGISTRATION_PREFIX: 'UPT26',

  // Untuk sekarang tidak memblokir pendaftaran ganda.
  // Bisa diubah ke true jika nanti dibutuhkan.
  CHECK_DUPLICATE: false,

  VALID_PRODI: [
    'Teknik Informatika',
    'Sistem Informasi',
    'Ilmu Hukum',
    'Teknik Industri',
    'Teknik Mesin',
    'Manajemen',
    'Akuntansi',
    'Pendidikan Guru Sekolah Dasar',
    'Pendidikan Pancasila dan Kewarganegaraan',
    'Pendidikan Agama Islam',
    'Psikologi',
    'Farmasi'
  ],

  VALID_ANGKATAN: ['2022', '2023', '2024', '2025', '2026'],

  VALID_PEMINATAN: [
    'Bahasa Inggris',
    'Bahasa Jepang',
    'Bahasa Mandarin'
  ],

  HEADERS: [
    'ID Registrasi',
    'Timestamp',
    'Nama Lengkap',
    'NIM',
    'Program Studi',
    'Angkatan',
    'Nomor Telepon',
    'Email',
    'Peminatan Bahasa'
  ]
});

function getSpreadsheetId_() {
  const spreadsheetId = PropertiesService
    .getScriptProperties()
    .getProperty('SPREADSHEET_ID');

  if (!spreadsheetId) {
    throw new Error('SPREADSHEET_ID belum diatur di Script Properties.');
  }

  return spreadsheetId;
}
