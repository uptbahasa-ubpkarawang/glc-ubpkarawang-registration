(() => {
  "use strict";

  /*
   * false = formulir dikunci
   * true  = formulir dibuka kembali
   */
  const REGISTRATION_OPEN = false;

  const CLOSED_MESSAGE =
    "Pendaftaran Peminatan Bahasa 2026 telah ditutup. Terima kasih atas antusiasmenya.";

  if (REGISTRATION_OPEN) return;

  const addClosedStyles = () => {
    if (document.getElementById("registrationClosedStyles")) return;

    const style = document.createElement("style");
    style.id = "registrationClosedStyles";
    style.textContent = `
      .registration-closed-notice {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 14px;
        align-items: center;
        margin: 0 0 24px;
        padding: 18px 20px;
        color: #7f1d1d;
        background: #fff1f2;
        border: 1px solid #fecdd3;
        border-left: 5px solid #dc2626;
        border-radius: 16px;
        box-shadow: 0 12px 28px rgba(127, 29, 29, 0.08);
      }

      .registration-closed-notice__icon {
        display: grid;
        place-items: center;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        color: #ffffff;
        background: #dc2626;
        font-size: 22px;
        font-weight: 800;
      }

      .registration-closed-notice strong,
      .registration-closed-notice p {
        display: block;
        margin: 0;
      }

      .registration-closed-notice strong {
        margin-bottom: 3px;
        font-size: 1.05rem;
      }

      .registration-closed-notice p {
        color: #991b1b;
        line-height: 1.55;
      }

      #registrationForm.registration-form-is-locked .form-grid {
        opacity: 0.58;
        filter: grayscale(0.18);
      }

      #registrationForm.registration-form-is-locked input,
      #registrationForm.registration-form-is-locked select,
      #registrationForm.registration-form-is-locked textarea,
      #registrationForm.registration-form-is-locked button {
        cursor: not-allowed !important;
      }

      #registrationForm.registration-form-is-locked .primary-button {
        opacity: 0.55;
        box-shadow: none;
        transform: none;
      }

      .registration-link-is-closed {
        position: relative;
      }

      @media (max-width: 560px) {
        .registration-closed-notice {
          grid-template-columns: 1fr;
          padding: 16px;
          text-align: center;
        }

        .registration-closed-notice__icon {
          margin-inline: auto;
        }
      }
    `;

    document.head.appendChild(style);
  };

  const markLandingPageLinks = () => {
    const registrationLinks = document.querySelectorAll(
      'a[href="registrasi.html"], a[href$="/registrasi.html"]'
    );

    registrationLinks.forEach((link) => {
      link.classList.add("registration-link-is-closed");
      link.setAttribute(
        "aria-label",
        "Registrasi ditutup. Buka halaman registrasi untuk melihat informasi."
      );
      link.title = "Pendaftaran telah ditutup";

      if (/daftar|registrasi/i.test(link.textContent.trim())) {
        link.textContent = "Registrasi Ditutup";
      }
    });
  };

  const lockRegistrationForm = () => {
    const form = document.getElementById("registrationForm");
    if (!form) return;

    form.classList.add("registration-form-is-locked");
    form.setAttribute("aria-disabled", "true");

    form.querySelectorAll("input, select, textarea, button").forEach((control) => {
      control.disabled = true;
      control.setAttribute("aria-disabled", "true");
    });

    const notice = document.createElement("section");
    notice.className = "registration-closed-notice";
    notice.setAttribute("role", "status");
    notice.setAttribute("aria-live", "polite");
    notice.innerHTML = `
      <span class="registration-closed-notice__icon" aria-hidden="true">!</span>
      <div>
        <strong>Pendaftaran Ditutup</strong>
        <p>${CLOSED_MESSAGE}</p>
      </div>
    `;

    form.before(notice);

    form.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
      },
      true
    );
  };

  const initializeRegistrationLock = () => {
    addClosedStyles();
    markLandingPageLinks();
    lockRegistrationForm();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeRegistrationLock, {
      once: true,
    });
  } else {
    initializeRegistrationLock();
  }
})();
