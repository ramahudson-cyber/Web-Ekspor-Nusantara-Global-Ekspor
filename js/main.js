/* ==========================================================================
   Nusantara Global Export - main.js
   Interaksi situs: navigasi mobile, reveal on scroll, form kontak ke WhatsApp,
   tahun footer. Tanpa dependensi. Konvensi keamanan: DESIGN.md bagian 10.
   ========================================================================== */
(function () {
  "use strict";

  var WA_NUMBER = "6281200000000"; // TODO: ganti dengan nomor WhatsApp sales asli

  /* ------------------------------------------------------------------
     Navigasi mobile: toggle panel, tutup dengan Escape / klik link.
     ------------------------------------------------------------------ */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var panel = document.querySelector(".site-nav--mobile");
    if (!toggle || !panel) {
      return;
    }

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      panel.classList.toggle("is-open", open);
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    panel.addEventListener("click", function (event) {
      if (event.target instanceof Element && event.target.closest("a")) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && panel.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------
     Reveal on scroll: IntersectionObserver (bukan listener scroll).
     Tanpa JS atau dengan reduced motion, konten tetap terlihat penuh.
     ------------------------------------------------------------------ */
  function initReveal() {
    var targets = document.querySelectorAll(".reveal");
    if (targets.length === 0) {
      return;
    }

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ------------------------------------------------------------------
     Form kontak: validasi inline, lalu membuka WhatsApp dengan pesan
     yang disusun dari isian. Data user hanya disentuh lewat
     URLSearchParams (ter-encode) dan textContent, tidak pernah HTML.
     ------------------------------------------------------------------ */
  function initContactForm() {
    var form = document.querySelector("#inquiry-form");
    if (!form) {
      return;
    }

    var fields = {
      name: form.querySelector("#field-name"),
      company: form.querySelector("#field-company"),
      country: form.querySelector("#field-country"),
      product: form.querySelector("#field-product"),
      volume: form.querySelector("#field-volume"),
      message: form.querySelector("#field-message")
    };
    var nameError = document.querySelector("#error-name");
    var messageError = document.querySelector("#error-message");
    var status = document.querySelector("#form-status");
    var submitBtn = form.querySelector('button[type="submit"]');

    function t(key) {
      return window.NGE_I18N && typeof window.NGE_I18N.t === "function"
        ? window.NGE_I18N.t(key)
        : key;
    }

    function setError(input, errorEl, hasError) {
      if (!input) {
        return;
      }
      input.setAttribute("aria-invalid", hasError ? "true" : "false");
      if (errorEl) {
        errorEl.classList.toggle("is-visible", hasError);
      }
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var name = fields.name ? fields.name.value.trim() : "";
      var message = fields.message ? fields.message.value.trim() : "";

      var nameInvalid = name.length === 0;
      var messageInvalid = message.length === 0;

      setError(fields.name, nameError, nameInvalid);
      setError(fields.message, messageError, messageInvalid);

      if (nameInvalid) {
        fields.name.focus();
        return;
      }
      if (messageInvalid) {
        fields.message.focus();
        return;
      }

      var lines = [
        "Hello Nusantara Global Export,",
        "",
        "Name: " + name,
        fields.company && fields.company.value.trim() ? "Company: " + fields.company.value.trim() : "",
        fields.country && fields.country.value.trim() ? "Destination: " + fields.country.value.trim() : "",
        fields.product && fields.product.value ? "Product: " + fields.product.value : "",
        fields.volume && fields.volume.value.trim() ? "Volume: " + fields.volume.value.trim() : "",
        "",
        message
      ].filter(function (line) {
        return line !== "";
      });

      var waUrl =
        "https://wa.me/" + WA_NUMBER + "?text=" +
        encodeURIComponent(lines.join("\n"));

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.originalLabel = submitBtn.textContent;
        submitBtn.textContent = t("contact.form.loading");
      }

      var win = window.open(waUrl, "_blank", "noopener,noreferrer");

      if (status) {
        status.textContent = t("contact.form.success");
        status.hidden = false;
      }

      window.setTimeout(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtn.dataset.originalLabel || submitBtn.textContent;
        }
        if (!win) {
          // Popup diblokir: kirim user langsung lewat tab yang sama.
          window.location.href = waUrl;
        }
      }, 600);
    });

    // Bersihkan error saat user mulai mengetik ulang.
    ["name", "message"].forEach(function (key) {
      if (fields[key]) {
        fields[key].addEventListener("input", function () {
          setError(fields[key], key === "name" ? nameError : messageError, false);
        });
      }
    });
  }

  /* ------------------------------------------------------------------
     Preselect produk dari products.html (?product=Coco%20Peat).
     Nilai dicocokkan terhadap opsi yang ada; tidak pernah di-HTML-kan.
     ------------------------------------------------------------------ */
  function initProductPreselect() {
    var select = document.querySelector("#field-product");
    if (!select) {
      return;
    }

    var params = new URLSearchParams(window.location.search);
    var requested = params.get("product");
    if (!requested) {
      return;
    }

    var options = select.options;
    for (var i = 0; i < options.length; i++) {
      if (options[i].value === requested) {
        select.value = requested;
        return;
      }
    }
  }

  /* ------------------------------------------------------------------
     Tahun footer.
     ------------------------------------------------------------------ */
  function initFooterYear() {
    var el = document.querySelector("#footer-year");
    if (el) {
      el.textContent = String(new Date().getFullYear());
    }
  }

  /* ------------------------------------------------------------------
     Boot. NGE_I18N.init dipanggil lebih dulu agar form membaca bahasa
     yang benar sebelum interaksi pertama.
     ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    if (window.NGE_I18N && typeof window.NGE_I18N.init === "function") {
      window.NGE_I18N.init();
    }
    initNav();
    initReveal();
    initContactForm();
    initProductPreselect();
    initFooterYear();
  });
})();
