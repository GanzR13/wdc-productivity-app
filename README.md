# 🎓 KawalSkripsi

Asisten cerdas terintegrasi untuk membantu mahasiswa mengelola, melacak, dan menyelesaikan tugas akhir (skripsi) dengan lebih terstruktur, fokus, dan bebas stres.

- Nama Website: KawalSkripsi

- Nama Tim: Lulus Tepat Waktu (LTW) Tech

# ✨ Daftar Fitur Utama Aplikasi

KawalSkripsi dirancang sebagai One-Stop Dashboard dengan 5 pilar fitur utama:

1. Jurnal Bimbingan & Catatan Terpadu
   - Form pencatatan jadwal bimbingan dosen (mendukung integrasi satu klik ke Google Calendar).
   - Sistem Tabbed Notes untuk memisahkan Catatan Revisi Dosen dan Catatan Ide Pribadi, lengkap dengan color-coding.

2. Grafik Capaian & Dashboard Analitik
   - Visualisasi progres pengerjaan skripsi dalam bentuk progress bar dinamis.
   - Rangkuman statistik aktivitas: Total Sesi Fokus, Jumlah Catatan, Jumlah Referensi, dan Distribusi Status Tugas.

3. Papan Kanban Progres Skripsi

    - Sistem manajemen tugas interaktif berbasis Drag and Drop (Belum Mulai, Sedang Dikerjakan, Selesai).

4. Pusat Referensi Digital

    - Gudang penyimpanan tautan eksternal (Jurnal Jaringan, Artikel Web, Repositori GitHub/GitLab).

    - Dilengkapi fitur pencarian real-time dan filter kategori dinamis.

5. Waktu Fokus (Integrasi Pomodoro Timer)

    - Timer produktivitas yang berjalan di background meskipun berpindah halaman (mendukung <KeepAlive>).

    - Peringatan audio otomatis dan layar overlay penuh (Full Screen Notification) saat waktu fokus atau istirahat berakhir.

Seluruh antarmuka telah dioptimalkan dengan transisi Dark Mode yang halus menggunakan Tailwind dark varian, memastikan kenyamanan visual mahasiswa saat bekerja di malam hari.

# 🛠️ Teknologi yang Digunakan (Tech Stack)

Aplikasi ini dibangun menggunakan arsitektur Frontend tanpa memerlukan backend server eksternal untuk menyimpan data pengguna (privasi terjamin).

- Core Framework: Vue.js 3

- Build Tool: Vite (untuk performa HMR dan kompilasi super cepat)

- Styling & UI: Tailwind CSS v3

- Icons: Lucide-Vue-Next

- Data Persistence: HTML5 Web Storage API (localStorage) dengan sinkronisasi Watcher reaktif.

- Routing: Vue Router (SPA - Single Page Application)

# 🚀 Panduan Instalasi & Menjalankan Aplikasi (Lokal)

Ikuti langkah-langkah di bawah ini untuk menjalankan aplikasi KawalSkripsi di mesin lokal Anda.

Prasyarat:

Pastikan Anda telah menginstal Node.js (versi 16.x atau terbaru) dan npm di komputer Anda.

Langkah Instalasi:

1. Kloning Repositori:
Buka terminal/CMD, lalu jalankan perintah berikut:

    `git clone [MASUKKAN URL REPOSITORI]`


2. Masuk ke Direktori Proyek:

    `cd [MASUKKAN NAMA FOLDER PROYEK]`


3. Instal Dependensi NPM:

    `npm install`


4. Jalankan Development Server:

    `npm run dev`


5. Akses Aplikasi:
Buka browser web (disarankan Google Chrome, Mozilla Firefox, atau Microsoft Edge) dan kunjungi tautan lokal yang tertera di terminal, biasanya:
http://localhost:5173

# 👥 Profil Tim Pengembang

Karya ini disusun dan dikembangkan dengan penuh semangat untuk kompetisi Web Design Competition (WDC) 2026.

[Muhammad Rizki Awaluddin Mubin]

[Muhammad Arifandi Prasetyo]

<p align="center">
<i>Dibuat dengan 💚 dan ☕ untuk mempermudah hidup mahasiswa tingkat akhir di mana pun berada.</i>
</p>