window.FormValidation = (() => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9+\-\s()]{8,20}$/;

  function validate(data) {
    const errors = {};

    if (!data.nama.trim()) {
      errors.nama = "Nama lengkap wajib diisi.";
    }

    if (data.nim && !/^[0-9A-Za-z.\-]+$/.test(data.nim)) {
      errors.nim = "Format NIM tidak valid.";
    }

    const validProdi = [
      "Teknik Informatika",
      "Sistem Informasi",
      "Ilmu Hukum",
      "Teknik Industri",
      "Teknik Mesin",
      "Manajemen",
      "Akuntansi",
      "Pendidikan Guru Sekolah Dasar",
      "Pendidikan Pancasila dan Kewarganegaraan",
      "Pendidikan Agama Islam",
      "Psikologi",
      "Farmasi"
    ];

    if (!data.prodi.trim()) {
      errors.prodi = "Program studi wajib dipilih.";
    } else if (!validProdi.includes(data.prodi)) {
      errors.prodi = "Program studi tidak valid.";
    }

    const validAngkatan = ["2022", "2023", "2024", "2025", "2026"];

    if (!data.angkatan) {
      errors.angkatan = "Angkatan wajib dipilih.";
    } else if (!validAngkatan.includes(String(data.angkatan))) {
      errors.angkatan = "Angkatan tidak valid.";
    }

    if (!data.telepon.trim()) {
      errors.telepon = "Nomor telepon wajib diisi.";
    } else if (!phonePattern.test(data.telepon.trim())) {
      errors.telepon = "Format nomor telepon tidak valid.";
    }

    if (!data.email.trim()) {
      errors.email = "Email wajib diisi.";
    } else if (!emailPattern.test(data.email.trim())) {
      errors.email = "Format email tidak valid.";
    }

    if (!data.peminatan) {
      errors.peminatan = "Pilih satu peminatan bahasa.";
    }

    return errors;
  }

  return { validate };
})();
