function validateRegistration_(payload) {
  const data = {
    nama: cleanText_(payload.nama),
    nim: cleanText_(payload.nim),
    prodi: cleanText_(payload.prodi),
    angkatan: cleanText_(payload.angkatan),
    telepon: cleanPhone_(payload.telepon),
    email: cleanText_(payload.email).toLowerCase(),
    peminatan: cleanText_(payload.peminatan)
  };

  const errors = {};

  if (!data.nama) {
    errors.nama = 'Nama lengkap wajib diisi.';
  } else if (data.nama.length < 2 || data.nama.length > 120) {
    errors.nama = 'Nama lengkap tidak valid.';
  }

  if (data.nim && !/^[0-9A-Za-z.\-]+$/.test(data.nim)) {
    errors.nim = 'Format NIM tidak valid.';
  }

  if (!APP_CONFIG.VALID_PRODI.includes(data.prodi)) {
    errors.prodi = 'Program studi tidak valid.';
  }

  if (!APP_CONFIG.VALID_ANGKATAN.includes(data.angkatan)) {
    errors.angkatan = 'Angkatan tidak valid.';
  }

  if (!data.telepon) {
    errors.telepon = 'Nomor telepon wajib diisi.';
  } else if (!/^\+?[0-9]{8,15}$/.test(data.telepon)) {
    errors.telepon = 'Format nomor telepon tidak valid.';
  }

  if (!data.email) {
    errors.email = 'Email wajib diisi.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Format email tidak valid.';
  }

  // Tidak ada validasi domain email kampus.
  // Note email kampus hanya bersifat informasi di frontend.

  if (!APP_CONFIG.VALID_PEMINATAN.includes(data.peminatan)) {
    errors.peminatan = 'Peminatan bahasa tidak valid.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors: errors,
    data: data
  };
}

function cleanText_(value) {
  return String(value == null ? '' : value)
    .trim()
    .replace(/\s+/g, ' ');
}

function cleanPhone_(value) {
  let phone = String(value == null ? '' : value)
    .trim()
    .replace(/[^\d+]/g, '');

  if (phone.indexOf('+') > 0) {
    phone = phone.replace(/\+/g, '');
  }

  return phone;
}
