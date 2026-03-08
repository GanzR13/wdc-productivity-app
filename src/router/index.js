import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: () => import('@/views/LandingPage.vue'),
      meta: { title: 'KawalSkripsi - Produktivitas Mahasiswa' }
    },
    {
      path: '/jurnal',
      name: 'JurnalBimbingan',
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
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
      meta: { title: 'Halaman Tidak Ditemukan - KawalSkripsi' }
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'KawalSkripsi - Produktivitas Mahasiswa'
  next()
})

export default router