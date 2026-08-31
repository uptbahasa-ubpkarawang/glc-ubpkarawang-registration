function setupDatabase() {
  const spreadsheet = SpreadsheetApp.openById(getSpreadsheetId_());

  let sheet = spreadsheet.getSheetByName(APP_CONFIG.SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(APP_CONFIG.SHEET_NAME);
  }

  const headerRange = sheet.getRange(
    1,
    1,
    1,
    APP_CONFIG.HEADERS.length
  );

  headerRange.setValues([APP_CONFIG.HEADERS]);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#2447A8');
  headerRange.setFontColor('#FFFFFF');

  sheet.setFrozenRows(1);

  sheet.getRange('B:B').setNumberFormat('dd/MM/yyyy HH:mm:ss');
  sheet.getRange('D:D').setNumberFormat('@');
  sheet.getRange('F:F').setNumberFormat('@');
  sheet.getRange('G:G').setNumberFormat('@');

  sheet.autoResizeColumns(1, APP_CONFIG.HEADERS.length);

  return 'Database siap digunakan.';
}
