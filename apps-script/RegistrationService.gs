function registerParticipant_(payload) {
  const validation = validateRegistration_(payload);

  if (!validation.valid) {
    return {
      success: false,
      message: 'Data registrasi belum valid.',
      errors: validation.errors
    };
  }

  const data = validation.data;
  const lock = LockService.getScriptLock();

  lock.waitLock(15000);

  try {
    const sheet = getRegistrationSheet_();

    if (APP_CONFIG.CHECK_DUPLICATE) {
      const duplicate = findDuplicate_(sheet, data);

      if (duplicate) {
        return {
          success: false,
          message: 'Data peserta sudah pernah terdaftar.',
          duplicateField: duplicate.field
        };
      }
    }

    const registrationId = nextRegistrationId_(sheet);
    const timestamp = new Date();

    sheet.appendRow([
      registrationId,
      timestamp,
      safeSheetValue_(data.nama),
      safeSheetValue_(data.nim),
      safeSheetValue_(data.prodi),
      safeSheetValue_(data.angkatan),
      safeSheetValue_(data.telepon),
      safeSheetValue_(data.email),
      safeSheetValue_(data.peminatan)
    ]);

    return {
      success: true,
      message: 'Registrasi berhasil.',
      registrationId: registrationId,
      data: {
        nama: data.nama,
        prodi: data.prodi,
        angkatan: data.angkatan,
        peminatan: data.peminatan
      }
    };

  } finally {
    lock.releaseLock();
  }
}

function getRegistrationSheet_() {
  const spreadsheet = SpreadsheetApp.openById(getSpreadsheetId_());
  const sheet = spreadsheet.getSheetByName(APP_CONFIG.SHEET_NAME);

  if (!sheet) {
    throw new Error(
      'Sheet "' + APP_CONFIG.SHEET_NAME +
      '" belum dibuat. Jalankan setupDatabase().'
    );
  }

  return sheet;
}

function nextRegistrationId_(sheet) {
  const lastRow = sheet.getLastRow();
  let maxNumber = 0;

  if (lastRow >= 2) {
    const ids = sheet
      .getRange(2, 1, lastRow - 1, 1)
      .getDisplayValues()
      .flat();

    ids.forEach(function(id) {
      const match = String(id).match(/^UPT26-(\d+)$/);

      if (match) {
        maxNumber = Math.max(maxNumber, Number(match[1]));
      }
    });
  }

  const nextNumber = maxNumber + 1;

  return APP_CONFIG.REGISTRATION_PREFIX
    + '-'
    + String(nextNumber).padStart(6, '0');
}

function findDuplicate_(sheet, data) {
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return null;
  }

  const rows = sheet
    .getRange(2, 1, lastRow - 1, APP_CONFIG.HEADERS.length)
    .getDisplayValues();

  const nim = data.nim.toLowerCase();
  const email = data.email.toLowerCase();
  const phone = data.telepon;

  for (let i = 0; i < rows.length; i++) {
    const rowNim = String(rows[i][3] || '').trim().toLowerCase();
    const rowPhone = String(rows[i][6] || '').trim();
    const rowEmail = String(rows[i][7] || '').trim().toLowerCase();

    if (nim && rowNim === nim) {
      return { field: 'nim' };
    }

    if (email && rowEmail === email) {
      return { field: 'email' };
    }

    if (phone && rowPhone === phone) {
      return { field: 'telepon' };
    }
  }

  return null;
}

function safeSheetValue_(value) {
  const text = String(value == null ? '' : value);

  // Mencegah isi form dieksekusi sebagai formula Sheets.
  if (/^[=+\-@]/.test(text)) {
    return "'" + text;
  }

  return text;
}
