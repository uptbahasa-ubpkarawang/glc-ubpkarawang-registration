function doGet(e) {
  try {
    const action = String(
      (e && e.parameter && e.parameter.action) || 'ping'
    ).toLowerCase();

    if (action === 'ping') {
      return jsonResponse_({
        success: true,
        message: 'Web_UPT_Bahasa_2026 API aktif.',
        timestamp: new Date().toISOString()
      });
    }

    return jsonResponse_({
      success: false,
      message: 'Action GET tidak dikenal.'
    });

  } catch (error) {
    console.error(error);

    return jsonResponse_({
      success: false,
      message: 'Terjadi kesalahan pada server.'
    });
  }
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse_({
        success: false,
        message: 'Request body kosong.'
      });
    }

    let payload;

    try {
      payload = JSON.parse(e.postData.contents);
    } catch (error) {
      return jsonResponse_({
        success: false,
        message: 'Format JSON tidak valid.'
      });
    }

    const action = String(payload.action || '').toLowerCase();

    if (action === 'register') {
      return jsonResponse_(registerParticipant_(payload));
    }

    return jsonResponse_({
      success: false,
      message: 'Action POST tidak dikenal.'
    });

  } catch (error) {
    console.error(error);

    return jsonResponse_({
      success: false,
      message: 'Terjadi kesalahan pada server.'
    });
  }
}

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
