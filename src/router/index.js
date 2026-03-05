import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // Redirect otomatis ke fitur wajib saat pertama kali dibuka
      path: '/',
      name: 'home',
      redirect: '/jurnal' 
    },
    {
      path: '/jurnal',
      name: 'JurnalBimbingan',
      // Menggunakan Lazy Loading agar website lebih cepat dimuat
      component: () => import('@/views/JurnalBimbingan.vue'),
      meta: { title: 'Catatan Revisi - KawalSkripsi' }
    },
    {
      path: '/kanban',
      name: 'PapanKanban',
      component: () => import('@/views/PapanKanban.vue'),
      meta: { title: 'Papan Progres - KawalSkripsi' }
    },
    {
      path: '/fokus',
      name: 'FokusPomodoro',
      component: () => import('@/views/FokusPomodoro.vue'),
      meta: { title: 'Waktu Fokus - KawalSkripsi' }
    },
    {
      path: '/referensi',
      name: 'PusatReferensi',
      component: () => import('@/views/PusatReferensi.vue'),
      meta: { title: 'Pusat Referensi - KawalSkripsi' }
    },
    {
      path: '/progres',
      name: 'PantauProgres',
      component: () => import('@/views/PantauProgres.vue'),
      meta: { title: 'Grafik Capaian - KawalSkripsi' }
    },
    // Halaman 404 (Opsional, tapi bagus untuk penilaian UI/UX)
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
      meta: { title: 'Halaman Tidak Ditemukan - KawalSkripsi' }
    }
  ]
})

// Navigation Guard: Mengubah title tab browser secara dinamis
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'KawalSkripsi - Produktivitas Mahasiswa'
  next()
})

export default router