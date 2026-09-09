/* ==========================================================================
   Nusantara Global Export - lang.js
   Kamus bilingual EN/ID + logika toggle bahasa.
   Dimuat sebelum main.js. Konvensi: DESIGN.md bagian 8.
   Default EN ter-render di HTML; JS hanya menukar teks via textContent.
   Gaya bahasa: sederhana, singkat, mudah dipahami pembeli internasional.
   ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "nge-lang";
  var SUPPORTED = ["en", "id"];

  /** Kamus flat per bahasa. Kunci = nilai data-i18n di HTML. */
  var MESSAGES = {
    en: {
      "meta.title.index": "Nusantara Global Export - Coconut Products, Exported at Scale",
      "meta.title.about": "About - Nusantara Global Export",
      "meta.title.products": "Products - Nusantara Global Export",
      "meta.title.contact": "Contact - Nusantara Global Export",

      "nav.home": "Home",
      "nav.products": "Products",
      "nav.about": "About",
      "nav.contact": "Contact",
      "nav.cta": "Talk to sales",
      "nav.langLabel": "Switch language",
      "nav.skip": "Skip to content",

      "footer.tagline": "Coconut products from Indonesia, shipped worldwide.",
      "footer.company": "Company",
      "footer.contact": "Contact",
      "footer.office": "Office",
      "footer.address": "Surabaya, East Java, Indonesia",
      "footer.rights": "All rights reserved.",

      "cta.h2": "Have a product in mind?",
      "cta.body": "Tell us the product, the amount, and the destination port. We reply within one working day.",
      "cta.button": "Talk to sales",

      "home.hero.eyebrow": "Coconut products from Indonesia",
      "home.hero.h1": "Indonesian coconut, world-class products",
      "home.hero.sub": "We prepare, test, and ship coconut products in large volumes, so they arrive at your port exactly as agreed.",
      "home.hero.ctaPrimary": "Talk to sales",
      "home.hero.ctaSecondary": "Browse products",
      "home.hero.slide1Caption": "Coconut fiber",
      "home.hero.slide2Caption": "Coco fiber bales",
      "home.hero.slide3Caption": "Shell charcoal",
      "home.hero.slide4Caption": "Semi husked coconut",
      "home.hero.slide5Caption": "Mature coconut",
      "home.hero.slide6Caption": "Copra",

      "home.support.label": "Need help?",
      "home.support.desc": "Our export team answers questions about products, documents, and shipping.",

      "home.proof.value1": "6",
      "home.proof.label1": "coconut products",
      "home.proof.value2": "20+",
      "home.proof.label2": "destination countries",
      "home.proof.value3": "FCL",
      "home.proof.label3": "full container loads",
      "home.proof.value4": "24h",
      "home.proof.label4": "reply within a day",

      "home.products.h2": "What we ship",
      "home.products.body": "Six curated products, sourced from trusted mills and farms.",
      "home.products.link": "See full catalog",

      "home.process.h2": "How your order reaches you",
      "home.process.s1t": "Sourcing",
      "home.process.s1d": "We contract trusted mills in Java and Sulawesi.",
      "home.process.s2t": "Processing",
      "home.process.s2d": "Products are cleaned, sorted, and tested to the agreed spec.",
      "home.process.s3t": "Certifying",
      "home.process.s3d": "We prepare quality and shipping documents for your country.",
      "home.process.s4t": "Shipping",
      "home.process.s4d": "Containers are sealed and tracked until they arrive.",

      "home.quality.h2": "Quality you can check",
      "home.quality.body": "Every shipment comes with a test certificate. You may send an inspector, such as SGS, before we load.",
      "home.quality.c1": "Test certificate for every shipment",
      "home.quality.c2": "Complete shipping documents",
      "home.quality.c3": "Inspection before loading, if you want it",
      "home.quality.c4": "Help with HS code (customs code)",

      "about.hero.h1": "We bring Indonesian coconut to the world",
      "about.hero.sub": "We are a trading company focused on coconut products. Our team grew up around coconut farmers and traders.",
      "about.story.h2": "Our story",
      "about.story.p1": "We started small: connecting charcoal makers in East Java with buyers abroad. Our first shipments taught us one thing: buyers want certainty, not just products.",
      "about.story.p2": "Today we handle six products from start to finish, from the mill to your port. Every shipment becomes our reference for the next one.",
      "about.values.h2": "How we work",
      "about.values.v1t": "One spec, one standard",
      "about.values.v1d": "The quality we agree on paper is the quality we load.",
      "about.values.v2t": "Few products, strong supply",
      "about.values.v2d": "We only sell what we can supply in big volume, season after season.",
      "about.values.v3t": "Documents first",
      "about.values.v3d": "No certificate, no shipment. Simple.",
      "about.values.v4t": "Straight from the mill",
      "about.values.v4d": "No middlemen between our mills and your warehouse.",

      "products.hero.h1": "Six products, one standard",
      "products.hero.sub": "Best price for full containers. Samples available for new buyers.",
      "products.semihusk.name": "Semi Husked Coconut",
      "products.semihusk.desc": "Fresh mature coconuts, husked and ready for export.",
      "products.mature.name": "Mature Coconut",
      "products.mature.desc": "Clean, hygienic coconut meat for food and drink makers.",
      "products.copra.name": "Copra",
      "products.copra.desc": "Naturally dried coconut meat with high oil content.",
      "products.charcoal.name": "Coconut Shell Charcoal",
      "products.charcoal.desc": "Long-burning natural charcoal for BBQ and shisha.",
      "products.cocopeat.name": "Coco Peat",
      "products.cocopeat.desc": "Clean growing medium for plants and farms.",
      "products.fiber.name": "Coco Fiber",
      "products.fiber.desc": "Strong coconut fiber, packed in bales for factories.",
      "products.card.cta": "Ask for a price",
      "products.soon.h2": "Coming soon",
      "products.soon.body": "We are preparing:",
      "products.soon.item1": "Tobacco leaf",
      "products.soon.item2": "Coffee",
      "products.soon.item3": "Spices",

      "contact.hero.h1": "Tell us what you need",
      "contact.hero.sub": "The fastest answer is on WhatsApp. The form below writes the message for you.",
      "contact.info.title": "Contact us",
      "contact.info.waLabel": "WhatsApp",
      "contact.info.emailLabel": "Email",
      "contact.info.officeLabel": "Office",
      "contact.info.hoursLabel": "Hours",
      "contact.info.hours": "Monday to Friday, 08.00 to 17.00 (WIB)",
      "contact.form.title": "Write your message",
      "contact.form.note": "When you send, WhatsApp opens with your message ready. Nothing is stored on any server.",
      "contact.form.name": "Full name",
      "contact.form.company": "Company",
      "contact.form.country": "Destination country",
      "contact.form.product": "Product",
      "contact.form.productNone": "Not sure yet",
      "contact.form.volume": "Monthly amount",
      "contact.form.volumePh": "e.g. 2 containers",
      "contact.form.message": "Message",
      "contact.form.messagePh": "Product, amount, destination port...",
      "contact.form.submit": "Open WhatsApp",
      "contact.form.loading": "Opening WhatsApp...",
      "contact.form.success": "WhatsApp is opening. If nothing happens, use the number on the left.",
      "contact.form.errName": "Please write your name.",
      "contact.form.errMsg": "Please write a short message."
    },

    id: {
      "meta.title.index": "Nusantara Global Export - Produk Kelapa, Ekspor Skala Besar",
      "meta.title.about": "Tentang - Nusantara Global Export",
      "meta.title.products": "Produk - Nusantara Global Export",
      "meta.title.contact": "Kontak - Nusantara Global Export",

      "nav.home": "Beranda",
      "nav.products": "Produk",
      "nav.about": "Tentang",
      "nav.contact": "Kontak",
      "nav.cta": "Hubungi sales",
      "nav.langLabel": "Ganti bahasa",
      "nav.skip": "Lewati ke konten",

      "footer.tagline": "Produk kelapa Indonesia, dikirim ke seluruh dunia.",
      "footer.company": "Perusahaan",
      "footer.contact": "Kontak",
      "footer.office": "Kantor",
      "footer.address": "Surabaya, Jawa Timur, Indonesia",
      "footer.rights": "Hak cipta dilindungi.",

      "cta.h2": "Sudah punya produk yang dicari?",
      "cta.body": "Sebutkan produk, jumlah, dan pelabuhan tujuan. Kami balas dalam satu hari kerja.",
      "cta.button": "Hubungi sales",

      "home.hero.eyebrow": "Produk kelapa dari Indonesia",
      "home.hero.h1": "Kelapa Indonesia, produk kelas dunia",
      "home.hero.sub": "Kami menyiapkan, menguji, dan mengirim produk kelapa dalam jumlah besar, sampai tiba di pelabuhan Anda sesuai kesepakatan.",
      "home.hero.ctaPrimary": "Hubungi sales",
      "home.hero.ctaSecondary": "Lihat produk",
      "home.hero.slide1Caption": "Serat kelapa",
      "home.hero.slide2Caption": "Bal serat kelapa",
      "home.hero.slide3Caption": "Arang batok",
      "home.hero.slide4Caption": "Kelapa semi husked",
      "home.hero.slide5Caption": "Kelapa matang",
      "home.hero.slide6Caption": "Kopra",

      "home.support.label": "Butuh bantuan?",
      "home.support.desc": "Tim ekspor kami siap menjawab soal produk, dokumen, dan pengiriman.",

      "home.proof.value1": "6",
      "home.proof.label1": "produk kelapa",
      "home.proof.value2": "20+",
      "home.proof.label2": "negara tujuan",
      "home.proof.value3": "FCL",
      "home.proof.label3": "kontainer penuh",
      "home.proof.value4": "24j",
      "home.proof.label4": "balas dalam sehari",

      "home.products.h2": "Apa yang kami kirim",
      "home.products.body": "Enam produk pilihan, dikurasi dari petani dan pabrik tepercaya.",
      "home.products.link": "Lihat katalog lengkap",

      "home.process.h2": "Bagaimana pesanan Anda sampai",
      "home.process.s1t": "Pengadaan",
      "home.process.s1d": "Kami mengontrak pabrik tepercaya di Jawa dan Sulawesi.",
      "home.process.s2t": "Pengolahan",
      "home.process.s2d": "Produk dibersihkan, disortir, dan diuji sesuai kesepakatan.",
      "home.process.s3t": "Sertifikasi",
      "home.process.s3d": "Kami menyiapkan dokumen mutu dan pengiriman untuk negara Anda.",
      "home.process.s4t": "Pengiriman",
      "home.process.s4d": "Kontainer disegel dan dilacak sampai tiba.",

      "home.quality.h2": "Mutu yang bisa Anda periksa",
      "home.quality.body": "Setiap kiriman disertai sertifikat uji. Anda boleh mengirim inspektur, misalnya SGS, sebelum kami memuat.",
      "home.quality.c1": "Sertifikat uji untuk setiap kiriman",
      "home.quality.c2": "Dokumen pengiriman lengkap",
      "home.quality.c3": "Pemeriksaan sebelum muat, jika Anda mau",
      "home.quality.c4": "Bantuan kode HS (kode Bea Cukai)",

      "about.hero.h1": "Kami membawa kelapa Indonesia ke pasar dunia",
      "about.hero.sub": "Kami perusahaan trading yang fokus pada produk kelapa. Tim kami tumbuh di tengah petani dan pedagang kelapa.",
      "about.story.h2": "Cerita kami",
      "about.story.p1": "Kami mulai kecil: menjembatani pembuat arang di Jawa Timur dengan pembeli luar negeri. Kiriman pertama mengajari kami satu hal: pembeli ingin kepastian, bukan sekadar produk.",
      "about.story.p2": "Kini kami mengurus enam produk dari awal sampai akhir, dari pabrik sampai pelabuhan Anda. Setiap kiriman menjadi pelajaran untuk kiriman berikutnya.",
      "about.values.h2": "Cara kami bekerja",
      "about.values.v1t": "Satu spesifikasi, satu standar",
      "about.values.v1d": "Mutu yang disepakati di atas kertas sama dengan yang kami muat.",
      "about.values.v2t": "Sedikit produk, pasokan kuat",
      "about.values.v2d": "Kami hanya menjual yang bisa dipasok dalam jumlah besar, musim demi musim.",
      "about.values.v3t": "Dokumen dulu",
      "about.values.v3d": "Tanpa sertifikat, kiriman tidak berangkat. Sederhana.",
      "about.values.v4t": "Langsung dari pabrik",
      "about.values.v4d": "Tanpa perantara antara pabrik kami dan gudang Anda.",

      "products.hero.h1": "Enam produk, satu standar",
      "products.hero.sub": "Harga terbaik untuk kontainer penuh. Sampel tersedia untuk pembeli baru.",
      "products.semihusk.name": "Kelapa Semi Husked",
      "products.semihusk.desc": "Kelapa matang segar, siap kirim ke luar negeri.",
      "products.mature.name": "Kelapa Matang",
      "products.mature.desc": "Daging kelapa bersih dan higienis untuk industri makanan dan minuman.",
      "products.copra.name": "Kopra",
      "products.copra.desc": "Daging kelapa kering alami dengan kandungan minyak tinggi.",
      "products.charcoal.name": "Arang Batok Kelapa",
      "products.charcoal.desc": "Arang alami yang awet terbakar untuk BBQ dan shisha.",
      "products.cocopeat.name": "Coco Peat",
      "products.cocopeat.desc": "Media tanam bersih untuk tanaman dan pertanian.",
      "products.fiber.name": "Coco Fiber",
      "products.fiber.desc": "Serat kelapa kuat, dikemas bal untuk pabrik.",
      "products.card.cta": "Tanya harga",
      "products.soon.h2": "Segera hadir",
      "products.soon.body": "Kami sedang menyiapkan:",
      "products.soon.item1": "Daun tembakau",
      "products.soon.item2": "Kopi",
      "products.soon.item3": "Rempah",

      "contact.hero.h1": "Sampaikan kebutuhan Anda",
      "contact.hero.sub": "Jawaban tercepat lewat WhatsApp. Formulir di bawah menuliskan pesannya untuk Anda.",
      "contact.info.title": "Hubungi kami",
      "contact.info.waLabel": "WhatsApp",
      "contact.info.emailLabel": "Email",
      "contact.info.officeLabel": "Kantor",
      "contact.info.hoursLabel": "Jam kerja",
      "contact.info.hours": "Senin sampai Jumat, 08.00 sampai 17.00 (WIB)",
      "contact.form.title": "Tulis pesan Anda",
      "contact.form.note": "Saat dikirim, WhatsApp terbuka dengan pesan Anda siap. Tidak ada data yang disimpan di server.",
      "contact.form.name": "Nama lengkap",
      "contact.form.company": "Perusahaan",
      "contact.form.country": "Negara tujuan",
      "contact.form.product": "Produk",
      "contact.form.productNone": "Belum yakin",
      "contact.form.volume": "Jumlah per bulan",
      "contact.form.volumePh": "mis. 2 kontainer",
      "contact.form.message": "Pesan",
      "contact.form.messagePh": "Produk, jumlah, pelabuhan tujuan...",
      "contact.form.submit": "Buka WhatsApp",
      "contact.form.loading": "Membuka WhatsApp...",
      "contact.form.success": "WhatsApp sedang terbuka. Jika tidak terjadi apa-apa, pakai nomor di kiri.",
      "contact.form.errName": "Tolong tulis nama Anda.",
      "contact.form.errMsg": "Tolong tulis pesan singkat."
    }
  };

  /** Ambil preferensi tersimpan, atau null bila belum pernah memilih. */
  function getStoredLang() {
    try {
      var stored = window.localStorage.getItem(STORAGE_KEY);
      return SUPPORTED.indexOf(stored) !== -1 ? stored : null;
    } catch (err) {
      return null; // localStorage bisa terblokir (mis. mode privat), default EN
    }
  }

  function storeLang(lang) {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (err) {
      /* abaikan: kegagalan simpan tidak boleh menghentikan toggle */
    }
  }

  /**
   * Terapkan bahasa ke seluruh dokumen: teks (data-i18n), atribut
   * (data-i18n-attr="placeholder:kunci|aria-label:kunci"), dan <title>.
   * Semua lewat textContent / setAttribute, tidak pernah innerHTML.
   */
  function applyLang(lang) {
    var dict = MESSAGES[lang];
    if (!dict) {
      return;
    }

    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      if (Object.prototype.hasOwnProperty.call(dict, key)) {
        nodes[i].textContent = dict[key];
      }
    }

    var attrNodes = document.querySelectorAll("[data-i18n-attr]");
    for (var j = 0; j < attrNodes.length; j++) {
      var pairs = attrNodes[j].getAttribute("data-i18n-attr").split("|");
      for (var k = 0; k < pairs.length; k++) {
        var pair = pairs[k].split(":");
        if (pair.length === 2 && Object.prototype.hasOwnProperty.call(dict, pair[1])) {
          attrNodes[j].setAttribute(pair[0], dict[pair[1]]);
        }
      }
    }

    var page = document.body.getAttribute("data-page");
    var titleKey = "meta.title." + page;
    if (page && Object.prototype.hasOwnProperty.call(dict, titleKey)) {
      document.title = dict[titleKey];
    }

    document.documentElement.setAttribute("lang", lang);
    storeLang(lang);

    var buttons = document.querySelectorAll(".lang-toggle__btn");
    for (var m = 0; m < buttons.length; m++) {
      buttons[m].setAttribute("aria-pressed", buttons[m].getAttribute("data-lang") === lang ? "true" : "false");
    }
  }

  /** API kecil untuk main.js dan handler tombol toggle. */
  window.NGE_I18N = {
    init: function () {
      var stored = getStoredLang();
      if (stored && stored !== "en") {
        applyLang(stored);
      } else {
        applyLang("en");
      }

      document.addEventListener("click", function (event) {
        if (!(event.target instanceof Element)) {
          return;
        }
        var btn = event.target.closest(".lang-toggle__btn");
        if (btn) {
          applyLang(btn.getAttribute("data-lang") === "id" ? "id" : "en");
        }
      });
    },
    current: function () {
      return document.documentElement.getAttribute("lang") || "en";
    },
    /** Ambil terjemahan aktif untuk satu kunci (fallback: kunci itu sendiri). */
    t: function (key) {
      var dict = MESSAGES[this.current()];
      return (dict && Object.prototype.hasOwnProperty.call(dict, key)) ? dict[key] : key;
    }
  };
})();
