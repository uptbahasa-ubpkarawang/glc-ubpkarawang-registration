document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const angkatanInput = document.getElementById("angkatan");
  const campusEmailNote = document.getElementById("campusEmailNote");
  const formMessage = document.getElementById("formMessage");
  const submitButton = document.getElementById("submitButton");

  const successModal = document.getElementById("successModal");
  const closeModalButton = document.getElementById("closeModalButton");

  function updateCampusEmailNote() {
    const year = Number(angkatanInput.value);
    const noteYears = Array.isArray(window.APP_CONFIG.CAMPUS_EMAIL_NOTE_YEARS)
      ? window.APP_CONFIG.CAMPUS_EMAIL_NOTE_YEARS.map(Number)
      : [2022, 2023, 2024, 2025];

    campusEmailNote.hidden = !noteYears.includes(year);
  }

  function getFormData() {
    const formData = new FormData(form);

    return {
      nama: String(formData.get("nama") || "").trim(),
      nim: String(formData.get("nim") || "").trim(),
      prodi: String(formData.get("prodi") || "").trim(),
      angkatan: String(formData.get("angkatan") || "").trim(),
      telepon: String(formData.get("telepon") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      peminatan: String(formData.get("peminatan") || "").trim()
    };
  }

  function clearErrors() {
    document.querySelectorAll("[data-error-for]").forEach(el => {
      el.textContent = "";
    });

    document.querySelectorAll('[aria-invalid="true"]').forEach(el => {
      el.removeAttribute("aria-invalid");
    });

    formMessage.className = "form-message";
    formMessage.textContent = "";
  }

  function renderErrors(errors) {
    Object.entries(errors).forEach(([field, message]) => {
      const errorEl = document.querySelector(`[data-error-for="${field}"]`);
      if (errorEl) errorEl.textContent = message;

      const input = document.getElementById(field);
      if (input) input.setAttribute("aria-invalid", "true");
    });

    formMessage.className = "form-message error";
    formMessage.textContent = "Periksa kembali data yang masih belum valid.";
  }

  function showSuccess(data, result) {
    document.getElementById("summaryRegistrationId").textContent =
      result.registrationId || "-";
    document.getElementById("summaryNama").textContent = data.nama || "-";
    document.getElementById("summaryAngkatan").textContent = data.angkatan || "-";
    document.getElementById("summaryPeminatan").textContent = data.peminatan || "-";
    successModal.hidden = false;
  }

  angkatanInput.addEventListener("change", updateCampusEmailNote);

  closeModalButton.addEventListener("click", () => {
    successModal.hidden = true;
  });

  successModal.addEventListener("click", (event) => {
    if (event.target === successModal) {
      successModal.hidden = true;
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearErrors();

    const data = getFormData();
    const errors = window.FormValidation.validate(data);

    if (Object.keys(errors).length > 0) {
      renderErrors(errors);
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Mengirim...";

    try {
      const result = await window.RegistrationAPI.submitRegistration(data);

      if (!result.success) {
        if (result.errors && typeof result.errors === "object") {
          renderErrors(result.errors);
          formMessage.textContent =
            result.message || "Data registrasi belum valid.";
          return;
        }

        throw new Error(result.message || "Registrasi gagal.");
      }

      formMessage.className = "form-message success";
      formMessage.textContent = result.message || "Registrasi berhasil.";
      showSuccess(data, result);

      form.reset();
      updateCampusEmailNote();
    } catch (error) {
      console.error(error);
      formMessage.className = "form-message error";
      formMessage.textContent =
        "Registrasi belum dapat dikirim. Silakan coba kembali.";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Daftar Sekarang";
    }
  });

  updateCampusEmailNote();
});
