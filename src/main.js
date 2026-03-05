// 1. Import CSS Utama (Sangat krusial agar Tailwind v4 berjalan)
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia' // Untuk mengelola data antar fitur
import App from './App.vue'
import router from './router' // Memanggil konfigurasi rute yang baru kita buat

const app = createApp(App)

// 2. Gunakan Pinia (State Management)
// Karena kamu backend dev, anggap Pinia ini sebagai "database lokal" (store)
// untuk menyimpan catatan revisi atau status tugas Kanban.
app.use(createPinia())

// 3. Gunakan Router
// Agar navigasi maksimal 15 halaman berjalan tanpa reload
app.use(router)

// 4. Mount (Tampilkan) ke dalam file index.html
app.mount('#app')