# Muhammad Zhafarul Maahiy — Developer Portfolio Website

Website portofolio developer interaktif berkinerja tinggi yang dibangun menggunakan arsitektur **Static Site Generation (SSG)** Astro 5 dan React 19. Proyek ini dirancang secara khusus untuk memamerkan profil profesional, riset di bidang *Data Science & Deep Learning* (termasuk proyek skripsi *Indonesian Emotional Voice Cloning*), sistem informasi skala instansi/enterprise, proyek web & mobile, serta rekam jejak pengalaman kerja dan kepemimpinan organisasi.

Website ini mengusung pendekatan estetika **dark-mode first** bergaya terminal/developer dengan palet warna modern **OKLCH (shadcn Vega theme)**, navigasi reaktif, serta transisi kartu bertumpuk (*sticky card stack*) yang dianimasikan menggunakan **GSAP ScrollTrigger**.

---

## 🛠️ Tech Stack & Library

Proyek ini dibangun secara ketat menggunakan kombinasi teknologi modern, teruji, dan efisien:

| Kategori | Teknologi / Library | Keterangan & Kegunaan |
| :--- | :--- | :--- |
| **Core Framework** | [Astro 5](https://astro.build/) | Static Site Generation (SSG) berkecepatan tinggi dengan konsep *Islands Architecture* (zero-JS secara bawaan). |
| **UI Components Engine** | [React 19](https://react.dev/) | Menangani komponen interaktif (*interactive islands*) seperti filter proyek, card stack, form kontak, dan theme toggle. |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Menjamin keamanan tipe (*strict type-safety*) di seluruh data portofolio, props komponen, dan konfigurasi rute. |
| **Styling & Utility** | [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) | Framework utilitas CSS generasi terbaru dengan integrasi Vite berkinerja tinggi. |
| **Design System & Theme** | [shadcn/ui](https://ui.shadcn.com/) (Vega Theme Tokens) | Menggunakan token warna berbasis **OKLCH** untuk kontras optimal baik pada tema Dark maupun Light. |
| **Typography** | `@fontsource/cascadia-code` | Font monospace modern untuk memperkuat nuansa developer/terminal pada teks, kode, dan badge. |
| **Animation & Parallax** | [GSAP 3.15](https://greensock.com/gsap/) + [ScrollTrigger](https://greensock.com/scrolltrigger/) | Mengatur efek parallax, *pinned stacking card effect* pada halaman utama, dan animasi *fade-in* sekuensial. |
| **Iconography** | [Lucide React](https://lucide.dev/) (v1.52.0) | Kumpulan ikon minimalis dengan ketebalan garis standar (*stroke width: 1.5*). |
| **Utility Helpers** | `clsx` & `tailwind-merge` | Penggabungan kelas CSS Tailwind secara dinamis dan aman dari konflik kelas (*conflict-free*). |
| **Package Manager** | [npm](https://www.npmjs.com/) | Manajemen dependensi proyek yang terintegrasi langsung dengan `package-lock.json`. |
| **Containerization** | [Docker](https://www.docker.com/) & Nginx Alpine | Multi-stage build (Node.js 22 builder & Nginx Alpine) untuk penyajian aset statis yang optimal dan siap produksi. |

---

## ✨ Fitur-Fitur Utama

### 1. Parallax Sticky Card Stack Landing Page (`/`)
Halaman utama menyajikan pengalaman visual interaktif berupa 7 seksi bertumpuk (*sticky stacking cards*) dengan background kanvas visual unik di setiap bagian:
- **Hero Section:** Pengenalan profil, foto portrait, status ketersediaan, identitas akademik lulusan Informatika Universitas Andalas (Cumlaude, IPK 3.78/4.00), quick stats, dan tombol unduh resume (PDF). *(Background: Gradient Waves)*
- **About Me Section:** Profil naratif profesional, filosofi rekayasa perangkat lunak, dan rincian fokus riset. *(Background: Pattern Waves)*
- **Featured Projects Section:** Menampilkan 3 proyek unggulan lengkap dengan sinopsis, tanggal pelaksanaan, tag teknologi, dan tautan langsung ke detail studi kasus. *(Background: Dot Field)*
- **Professional Experience Section:** Preview pengalaman kerja profesional (PT. Imani Prima, Pemprov Sumbar) dan organisasi. *(Background: Particles)*
- **Technical Skills Matrix:** Pemetaan keahlian teknis terstruktur dalam 4 kategori utama (*Programming Languages*, *Data Science & AI*, *Frameworks & Web*, serta *Database & Tools*) dengan bar indikator tingkat kemahiran (*Expert*, *Advanced*, *Intermediate*). *(Background: Grid Scan)*
- **Achievements & Certifications Section:** Dokumentasi gelar akademik, sertifikasi industri resmi (Oracle Academy SQL & Database Design, CodePolitan Fullstack), dan riwayat kepemimpinan. *(Background: Light Rays)*
- **Get in Touch / Contact Section:** Form pengiriman pesan interaktif dilengkapi validasi email, tombol pintas ke WhatsApp, dan tautan ke kanal profesional (GitHub, LinkedIn, Email). *(Background: Orb Glow)*

### 2. Fixed Reactive Navbar & Theme Toggle
- **Smart Scroll Detection:** Navbar berposisi `fixed` (`z-[100]`), memiliki efek latar transparan saat di posisi paling atas layar, dan bertransisi mulus menjadi solid gelap dengan teks tebal saat halaman digulir.
- **Interactive Theme Switcher:** Mendukung perpindahan instan antara tema **Dark (default)** dan **Light**, dengan preferensi pengguna yang tersimpan otomatis di `localStorage`.
- **Responsive Mobile Drawer:** Menu navigasi ramah sentuhan untuk perangkat seluler.

### 3. Halaman Direktori Proyek Lengkap (`/projects`)
- **Kategori Filter Instan:** Menyaring proyek berdasarkan kategori (*All*, *AI & Deep Learning*, *Enterprise Systems*, *Web Development*, *Mobile Application*).
- **Live Search Query:** Kolom pencarian instan yang mencocokkan kata kunci pada judul proyek, sinopsis, maupun tag teknologi yang digunakan secara *real-time*.

### 4. Halaman Detail Studi Kasus Proyek (`/projects/[id]`)
- Halaman statis terdedikasi untuk masing-masing proyek yang disajikan dengan format studi kasus rekayasa perangkat lunak:
  - **Overview & Latar Belakang:** Penjelasan komprehensif mengenai latar belakang dan tujuan proyek.
  - **Tantangan Teknis (*Challenges*):** Hambatan teknis yang dihadapi selama masa riset/pengembangan.
  - **Solusi Rekayasa (*Solutions*):** Pendekatan arsitektur dan solusi teknis yang diterapkan.
  - **Hasil & Dampak (*Outcomes*):** Hasil nyata dan metrik pencapaian proyek.
  - **Spesifikasi Teknologi:** Tag teknologi terperinci dan tautan repositori kode sumber (GitHub) atau tautan aplikasi langsung.

### 5. Halaman Direktori Pengalaman (`/experience`)
- Menyajikan seluruh riwayat perjalanan karier dan pengabdian.
- Dilengkapi tombol filter kategori antara **Work** (pekerjaan profesional/kontrak/magang) dan **Organization** (organisasi kemahasiswaan & kepengurusan media).

### 6. Halaman Detail Pengalaman (`/experience/[id]`)
- Menampilkan rincian mendalam mengenai peran kerja, nama institusi/perusahaan, durasi, lokasi, deskripsi tugas, daftar pencapaian utama (*key achievements*), serta daftar keterampilan yang dipraktikkan.

### 7. Showcase Sistem Desain (`/design-system`)
- Halaman referensi komponen (`/design-system`) yang mendemonstrasikan token warna OKLCH Vega, tipografi Cascadia Code, varian tombol (*Button*), lencana status (*Badge*), kartu (*Card*), dan elemen formulir input.

---

## 📁 Struktur Direktori Proyek

```text
myprofile/
├── public/                 # Aset publik statis (favicon, robot.txt)
├── src/
│   ├── assets/             # Asset gambar, foto profil, dan dokumen resume PDF
│   ├── components/
│   │   ├── backgrounds/    # Komponen background visual interaktif (Waves, Particles, DotField, dll.)
│   │   ├── sections/       # Komponen setiap seksi pada main card stack (Hero, About, Projects, dll.)
│   │   ├── ui/             # Komponen antarmuka dasar shadcn (Badge, Button, Card, Input, Textarea)
│   │   ├── CardStack.tsx   # Controller animasi sticky card stack berbasis GSAP ScrollTrigger
│   │   ├── ExperienceClient.tsx # Client island interaktif untuk filter pengalaman
│   │   ├── Footer.tsx      # Footer responsif dengan tautan sosial
│   │   ├── Navbar.tsx      # Fixed navbar reaktif dengan theme toggle
│   │   ├── ProjectsClient.tsx   # Client island interaktif untuk search & filter proyek
│   │   └── ThemeToggle.tsx # Tombol pengubah tema Light/Dark
│   ├── data/
│   │   └── portfolioData.ts# Single source of truth untuk seluruh data profil, proyek, keahlian, dan sertifikasi
│   ├── layouts/
│   │   └── Layout.astro    # Master layout pembungkus halaman (metadata, font, navigasi, footer)
│   ├── pages/
│   │   ├── experience/
│   │   │   ├── [id].astro  # Halaman dinamis studi kasus detail pengalaman
│   │   │   └── index.astro # Halaman direktori seluruh pengalaman
│   │   ├── projects/
│   │   │   ├── [id].astro  # Halaman dinamis studi kasus detail proyek
│   │   │   └── index.astro # Halaman direktori seluruh proyek
│   │   ├── design-system.astro # Halaman dokumentasi komponen UI
│   │   └── index.astro     # Halaman utama (main page card stack)
│   └── styles/
│       └── global.css      # Konfigurasi Tailwind CSS v4 dan variabel token warna Vega (OKLCH)
├── astro.config.mjs        # Konfigurasi integrasi Astro (React, Tailwind Vite plugin)
├── Dockerfile              # Docker multi-stage build untuk build & deployment statis Nginx
├── docker.yaml             # Docker Compose service definition
├── package.json            # Manifest paket dependensi dan scripts npm
├── package-lock.json       # Lockfile resmi dependensi npm
└── tsconfig.json           # Konfigurasi compiler TypeScript
```

---

## 🚀 Panduan Memulai (Getting Started)

### Prasyarat
- **Node.js:** Versi `>= 22.12.0`
- **npm:** Versi `>= 10.0.0`

### 1. Instalasi Dependensi
Jalankan perintah berikut untuk mengunduh seluruh dependensi yang diperlukan:
```bash
npm install
```

### 2. Menjalankan Server Pengembangan (Development Server)
Jalankan dev server Astro secara lokal:
```bash
npm run dev
```
Setelah server aktif, buka browser Anda di:
```text
http://localhost:4321
```

*(Opsional: Jika ingin menjalankan dev server di latar belakang / background mode, gunakan `npx astro dev --background`)*.

### 3. Build untuk Produksi (Static Build)
Perintah ini akan melakukan pengecekan tipe (*type-check*) menggunakan `astro check` sekaligus mem-bundle seluruh halaman menjadi file HTML statis:
```bash
npm run build
```
Seluruh aset statis yang telah dioptimasi akan dihasilkan di direktori `dist/`.

### 4. Pratinjau Hasil Build (Preview)
Untuk menguji hasil kompilasi statis sebelum di-deploy:
```bash
npm run preview
```

---

## 🐳 Menjalankan dengan Docker

Proyek ini telah dilengkapi konfigurasi `Dockerfile` multi-stage (Node.js 22 Alpine untuk builder dan Nginx Alpine untuk serving dengan kompresi gzip aktif):

1. **Build dan Jalankan Container:**
   ```bash
   docker compose -f docker.yaml up -d --build
   ```

2. **Akses Aplikasi:**
   Buka `http://localhost:4321` di browser Anda.

3. **Menghentikan Container:**
   ```bash
   docker compose -f docker.yaml down
   ```

---

## 📄 Lisensi & Hak Cipta

Didesain dan dikembangkan oleh **Muhammad Zhafarul Maahiy** ([@glifordosade](https://github.com/glifordosade)).  
Seluruh hak cipta dilindungi undang-undang &copy; 2026.
