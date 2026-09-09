# DESIGN.md - Nusantara Global Export

Design system dan konvensi engineering untuk website company profile ini.
Semua halaman dan komponen baru **wajib** mengikuti file ini.

---

## 1. Design Read

> **B2B commodity-export company profile** untuk procurement buyer internasional,
> dengan bahasa visual **natural-eco premium**, dibangun sebagai **static multi-page
> site** (HTML + CSS + JS murni, tanpa build step).

| Dial | Nilai | Alasan |
| --- | --- | --- |
| `DESIGN_VARIANCE` | 7 | Asimetri terkendali: hero split, grid produk tidak seragam, whitespace besar. Mobile wajib collapse ke 1 kolom. |
| `MOTION_INTENSITY` | 4 | Transisi CSS + reveal berbasis IntersectionObserver. Tanpa scroll-hijack, tanpa loop tak berujung. |
| `VISUAL_DENSITY` | 3 | Banyak whitespace, section lapang, konten dipangkas pendek. |

**Prinsip anti-slop yang dikunci untuk proyek ini:**

- Nol em-dash (dan en-dash pemisah) di seluruh copy. Pemisah memakai spasi, koma, atau hyphen biasa.
- Satu warna aksen (hijau kelapa tua) dipakai konsisten di semua section. Tidak ada aksen kedua.
- Tidak ada 3 kartu fitur identik berjajar. Grid produk memakai ritme asimetris.
- Eyebrow (label kecil uppercase di atas judul) maksimal 1 per 3 section.
- Tanpa scroll cue, tanpa versi di footer, tanpa strip dekoratif, tanpa dot status dekoratif.
- Setiap angka statistik diberi komentar `<!-- mock -->` di HTML sampai diganti data asli.

---

## 2. Warna (Token)

Tema terang, dikunci satu tema untuk seluruh situs. Satu-satunya section gelap
adalah CTA band + footer (`--color-band`). Semua warna lewat CSS custom property,
dilarang hardcode hex di aturan komponen.

| Token | Nilai | Pemakaian |
| --- | --- | --- |
| `--color-bg` | `#FAFAF7` | Latar halaman (off-white dingin, bukan krem hangat) |
| `--color-surface` | `#FFFFFF` | Permukaan kartu / header |
| `--color-surface-2` | `#EFF3ED` | Permukaan tint sage (section alternatif) |
| `--color-ink` | `#152019` | Teks utama (hijau-hitam, bukan hitam murni) |
| `--color-ink-2` | `#4C5B52` | Teks sekunder (kontras AA di atas bg) |
| `--color-line` | `#E2E8DF` | Garis pemisah 1px |
| `--color-accent` | `#1B6B47` | Aksen tunggal: link, CTA, highlight. Putih di atasnya lolos AA |
| `--color-accent-strong` | `#12513A` | Hover / pressed aksen |
| `--color-accent-soft` | `#E3EFE7` | Latar chip / badge aksen |
| `--color-band` | `#10241B` | Band CTA + footer + hero gelap |
| `--color-accent-on-dark` | `#9FD1B4` | Aksen di atas latar gelap (eyebrow, hover link) |

Aturan kontras: teks body minimal WCAG AA 4.5:1, teks besar 3:1.

---

## 3. Tipografi

| Peran | Font | Catatan |
| --- | --- | --- |
| Display / heading | **Outfit** (600/700) | Sans display, bukan Inter, bukan serif default |
| Body / UI | **Manrope** (400/500/600) | Dibuat untuk keterbacaan layar kecil |

Dimuat via Google Fonts `display=swap` + `preconnect`. Untuk produksi komersial
disarankan self-host (ditandai TODO di HTML).

Skala fluid (mobile-first, `clamp()`):

```
--text-display: clamp(2.4rem, 5.4vw + 1rem, 4.25rem)  /* H1 hero */
--text-h2:      clamp(1.75rem, 2.6vw + 1rem, 2.5rem)
--text-h3:      clamp(1.25rem, 1vw + 1rem, 1.5rem)
--text-lead:    clamp(1.0625rem, 0.4vw + 1rem, 1.25rem)
--text-body:    1rem
--text-small:   0.875rem
--text-micro:   0.8125rem  /* eyebrow, caption */
```

Heading `letter-spacing: -0.02em`, `line-height` 1.05 (display) / 1.2 (h2-h3).
Body `line-height: 1.65`, paragraf dibatasi `max-width: 62ch`.
Eyebrow: `--text-micro`, `letter-spacing: 0.16em`, uppercase, warna aksen, rasionya dibatasi (bagian 1).

---

## 4. Spasi, Radius, Bayangan

Spasi berbasis 4px: `--space-1` sampai `--space-10` (4, 8, 12, 16, 24, 32, 48, 64, 96, 128).

Section vertikal: `clamp(4rem, 8vw, 7.5rem)` antar section. Container:
`max-width: 76rem`, padding-inline `clamp(1.25rem, 4vw, 2.5rem)`.

**Shape lock (satu sistem radius, diikuti semua komponen):**

| Elemen | Radius |
| --- | --- |
| Button, chip, badge, toggle bahasa | `999px` (pill) |
| Kartu, gambar, panel form | `--radius-card: 18px` |
| Input, select | `--radius-input: 12px` |

Bayangan: selalu tint hijau, bukan hitam murni.
`--shadow-card: 0 12px 32px -16px rgba(21, 32, 25, 0.18)`.
Kartu hanya dipakai jika elevasi bermakna; sisanya dikelompokkan dengan garis atau whitespace.

---

## 5. Layout & Responsif

- Breakpoints: **640 / 768 / 1024 / 1280**. Mobile-first, aturan desktop di `min-width`.
- Grid memakai CSS Grid (bukan matematika flexbox persen). Asimetri via `grid-template-columns` fr berbeda.
- `min-height: 100dvh` (bukan `100vh`) untuk hero, anti-lompat address bar iOS.
- Hero: split 2 kolom di `≥1024px`, stack di bawahnya. Maksimal 4 elemen teks: eyebrow, H1 (maks 2 baris), subteks (maks 20 kata), 2 CTA.
- Navigasi: satu baris di desktop, tinggi 72px, hamburger di `≤820px`.
- Semua gambar punya `width`/`height` eksplisit + `aspect-ratio` agar CLS < 0.1.
- Setiap layout multi-kolom punya aturan collapse eksplisit ke 1 kolom `< 768px`.

---

## 6. Komponen

| Komponen | Aturan kunci |
| --- | --- |
| **Button** | Primary: pill, `--color-accent`, teks putih. Secondary: pill outline `--color-line`, teks `--color-ink`. On-band: pill putih, teks band (`btn--light`). On-dark ghost: outline putih transparan (`btn--ghost-band`). `:active` turun `scale(0.98)`. Label CTA kontak tunggal: **"Talk to sales"** di seluruh situs. |
| **Hero (index)** | Gelap full-bleed (referensi template webekspor): foto latar + overlay gradien hijau-hitam (sisi kiri paling pekat agar teks selalu AA), teks putih di kiri (maks 4 elemen: eyebrow, H1 2 baris, subteks, 2 CTA). Ini satu-satunya transisi tema gelap-terang yang disengaja di halaman. Di dasarnya ada **strip support**: ikon lingkaran + label kecil + nomor WhatsApp besar (link wa.me) + satu kalimat penjelas; tanpa tombol terpisah agar tidak duplikat label CTA kontak. Mobile: tanpa min-height, strip jadi stack. |
| **Header** | Sticky, latar `rgba(250, 250, 247, 0.92)` + `backdrop-filter: blur(8px)`, garis bawah `--color-line`. Link aktif: warna aksen. |
| **Product card** | Gambar rasio 4:3, nama, one-liner, chip spesifikasi. Hover: `translateY(-4px)` + shadow. Grid asimetris (span 6 / 3+3 / 2+4), tanpa kartu kosong. |
| **Process list** | Daftar vertikal dengan angka display besar (bukan label "Step 1"), label kata kerja: Sourcing, Processing, Certifying, Shipping. |
| **CTA band** | `--color-band`, teks putih, H2 + 1 CTA. Konsisten sebelum footer di semua halaman. |
| **Form** | Label **di atas** input (tidak pernah placeholder-sebagai-label). Error inline di bawah input, `aria-describedby` + `aria-invalid`. Focus ring `2px --color-accent` offset 2px. |
| **Footer** | `--color-band`, grid 4 kolom collapse ke stack, tahun via JS, tanpa versi/build. |
| **Language toggle** | Pill kecil di header: `EN / ID`, `aria-pressed`, default EN, pilihan disimpan `localStorage` (kunci `nge-lang`, nilai non-sensitif). |

---

## 7. Motion

- Hanya `transform` dan `opacity` yang dianimasikan.
- Easing tunggal: `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`, durasi 200-500ms.
- Reveal-on-scroll via IntersectionObserver (bukan listener scroll), sekali jalan, stagger via `nth-child` delay.
- **Wajib** hormati `prefers-reduced-motion: reduce`: semua animasi dimatikan, konten langsung tampil.
- Setiap animasi harus punya alasan (hierarki / feedback), tidak ada loop dekoratif.

---

## 8. Bilingual EN / ID

- Bahasa default **EN** (target buyer internasional), ter-render di HTML agar SEO & no-JS tetap utuh.
- Setiap elemen terjemahan punya `data-i18n="page.key"`; atribut via `data-i18n-attr="placeholder:page.key"`.
- Kamus tunggal di `js/lang.js` (`window.NGE_I18N = { en, id }`), dimuat **sebelum** `main.js`.
- Toggle memperbarui `document.documentElement.lang`, `<title>`, `localStorage`, dan `aria-pressed`.
- Dilarang menyisipkan terjemahan lewat `innerHTML`; semua via `textContent` / atribut.

---

## 9. Konvensi Kode (kualitas software engineer)

### HTML
- Semantic HTML5: `header/nav/main/section/article/footer`, satu `<h1>` per halaman, urutan heading benar.
- Meta lengkap: `charset`, `viewport`, `description`, Open Graph, `theme-color`, favicon.
- CSP via `<meta http-equiv="Content-Security-Policy">` (bagian 10).
- Gambar: `alt` deskriptif, `loading="lazy"` (hero: `fetchpriority="high"`), `decoding="async"`.

### CSS
- Custom properties untuk semua token, komentar per blok, mobile-first, BEM ringan (`.card__title`).
- Tanpa `!important`, tanpa selector over-qualified, tanpa duplikasi.

### JavaScript
- ES2020+, `'use strict'`, IIFE, tanpa dependensi eksternal, `defer` di semua script.
- Tanpa inline handler, tanpa `eval` / `new Function`, tanpa `innerHTML` dengan input dinamis.
- Query DOM di-cache, guard null, event delegation bila perlu.
- Progresif: tanpa JS, situs tetap terbaca penuh dalam EN (hanya toggle bahasa & form WA yang butuh JS).

---

## 10. Keamanan (hardening)

| Ancaman | Mitigasi |
| --- | --- |
| XSS | `textContent` untuk semua string dinamis; input user hanya menyusun URL via `URLSearchParams` (ter-encode); CSP melarang inline script. |
| Clickjacking | Meta CSP tidak mendukung `frame-ancestors`, jadi **wajib** header `X-Frame-Options: DENY` saat di-host (catatan deployment di bawah). |
| Tabnabbing | Semua `target="_blank"` wajib `rel="noopener noreferrer"`. |
| Injection ke WhatsApp | Pesan hanya teks hasil `encodeURIComponent`; tidak ada markup yang dikirim. |
| Form abuse | `maxlength` di semua input, `type` + `inputmode` tepat, validasi client-side, `autocomplete` benar, tanpa pengiriman ke server (pesan dibuka di WhatsApp oleh user sendiri). |
| Referer leak | `referrerpolicy="strict-origin-when-cross-origin"` di meta dan link eksternal. |

**CSP meta yang dipakai setiap halaman:**

```
default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com;
font-src https://fonts.gstatic.com; img-src 'self' https://picsum.photos
https://fastly.picsum.photos data:; connect-src 'none'; object-src 'none';
base-uri 'self'; form-action 'self' https://wa.me
```

**Catatan deployment** (header HTTP di host, karena meta CSP tidak mencakup semuanya):
`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
`Referrer-Policy: strict-origin-when-cross-origin`, HSTS bila HTTPS.
Netlify: pasang di `_headers`; cPanel: `.htaccess`.

---

## 11. Peta file

```
/
├── DESIGN.md          ← file ini
├── index.html         Home
├── about.html         Profil perusahaan
├── products.html      Katalog produk
├── contact.html       Kontak + form
├── css/style.css      Satu stylesheet (token + komponen)
├── js/lang.js         Kamus EN/ID + logika toggle
├── js/main.js         Nav, reveal, form WhatsApp, tahun footer
└── assets/            favicon.svg (logo monogram inline di HTML)
```

## 12. Ganti placeholder ke data asli

Cari komentar `<!-- TODO: ... -->` di HTML. Yang wajib diganti sebelum go-live:
nomor WhatsApp (`wa.me/62...`), alamat email, alamat kantor, foto (saat ini
placeholder `picsum.photos` ber-seed), angka statistik bertanda `<!-- mock -->`,
dan nama domain di `<link rel="canonical">` + Open Graph.
