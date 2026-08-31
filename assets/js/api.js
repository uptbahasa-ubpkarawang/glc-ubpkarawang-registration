window.RegistrationAPI = (() => {
  async function submitRegistration(payload) {
    const apiUrl = window.APP_CONFIG.API_URL;

    // Mode simulasi selama backend belum dihubungkan.
    if (!apiUrl) {
      await new Promise(resolve => setTimeout(resolve, 350));
      return {
        success: true,
        message: "Simulasi berhasil. Backend belum terhubung."
      };
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        action: "register",
        ...payload
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
  }

  return { submitRegistration };
})();
