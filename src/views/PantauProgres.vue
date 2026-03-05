<script setup>
import { ref, computed, onMounted } from 'vue'
import { TrendingUp, Target, Award, Brain, BookOpenCheck, LibraryBig, CheckCircle2, CircleDashed, Timer } from 'lucide-vue-next'

// State untuk menampung data dari Local Storage
const dataKanban = ref([])
const totalSesiFokus = ref(0)
const totalCatatan = ref(0)
const totalReferensi = ref(0)

onMounted(() => {
  // Mengambil semua rekam jejak produktivitas
  const kanbanLokal = localStorage.getItem('kawalSkripsi_kanban')
  if (kanbanLokal) dataKanban.value = JSON.parse(kanbanLokal)

  const sesiLokal = localStorage.getItem('kawalSkripsi_sesi')
  if (sesiLokal) totalSesiFokus.value = parseInt(sesiLokal)

  const catatanLokal = localStorage.getItem('kawalSkripsi_catatan')
  if (catatanLokal) totalCatatan.value = JSON.parse(catatanLokal).length

  const referensiLokal = localStorage.getItem('kawalSkripsi_referensi')
  if (referensiLokal) totalReferensi.value = JSON.parse(referensiLokal).length
})

// Kalkulasi Statistik Kanban
const statsKanban = computed(() => {
  const total = dataKanban.value.length || 1 // Hindari pembagian dengan nol
  const todo = dataKanban.value.filter(t => t.status === 'todo').length
  const progress = dataKanban.value.filter(t => t.status === 'progress').length
  const done = dataKanban.value.filter(t => t.status === 'done').length
  
  const persentase = Math.round((done / total) * 100) || 0

  return { total, todo, progress, done, persentase }
})

// Pesan Motivasi Dinamis
const pesanMotivasi = computed(() => {
  const p = statsKanban.value.persentase
  if (p === 0) return "Perjalanan ribuan mil dimulai dengan satu langkah. Ayo mulai bab 1!"
  if (p < 40) return "Progres yang bagus! Tetap konsisten dan jangan lupa istirahat."
  if (p < 80) return "Setengah jalan terlewati! Gelar sarjana sudah di depan mata."
  if (p < 100) return "Sedikit lagi selesai! Siapkan mental untuk sidang."
  return "Luar Biasa! Skripsi tuntas, selamat menyongsong wisuda! 🎉"
})
</script>

<template>
  <div class="space-y-8">
    
    <div class="transition-colors duration-300">
      <h1 class="text-3xl font-bold text-slate-800 dark:text-white flex items-center">
        <TrendingUp class="mr-3 text-emerald-500 w-8 h-8" />
        Grafik Capaian
      </h1>
      <p class="text-slate-500 dark:text-slate-400 mt-2">Rangkuman seluruh aktivitas dan progres tugas akhirmu di KawalSkripsi.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-between hover:-translate-y-1 transition-all duration-300">
        <div>
          <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Sesi Fokus</p>
          <h3 class="text-3xl font-bold text-slate-800 dark:text-white">{{ totalSesiFokus }}</h3>
        </div>
        <div class="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-500 dark:text-blue-400 flex items-center justify-center transition-colors">
          <Brain class="w-6 h-6" />
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-between hover:-translate-y-1 transition-all duration-300">
        <div>
          <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Catatan Revisi</p>
          <h3 class="text-3xl font-bold text-slate-800 dark:text-white">{{ totalCatatan }}</h3>
        </div>
        <div class="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-500 dark:text-amber-400 flex items-center justify-center transition-colors">
          <BookOpenCheck class="w-6 h-6" />
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-between hover:-translate-y-1 transition-all duration-300">
        <div>
          <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Pusat Referensi</p>
          <h3 class="text-3xl font-bold text-slate-800 dark:text-white">{{ totalReferensi }}</h3>
        </div>
        <div class="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 flex items-center justify-center transition-colors">
          <LibraryBig class="w-6 h-6" />
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-between hover:-translate-y-1 transition-all duration-300">
        <div>
          <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Tugas Tuntas</p>
          <h3 class="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            {{ statsKanban.done }} <span class="text-lg text-slate-400 dark:text-slate-500">/ {{ statsKanban.total }}</span>
          </h3>
        </div>
        <div class="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 flex items-center justify-center transition-colors">
          <CheckCircle2 class="w-6 h-6" />
        </div>
      </div>

    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <div class="lg:col-span-2 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-300">
        <div class="flex items-start justify-between mb-8">
          <div>
            <h2 class="text-xl font-bold text-slate-800 dark:text-white flex items-center">
              <Target class="w-6 h-6 mr-2 text-emerald-500 dark:text-emerald-400" />
              Penyelesaian Skripsi
            </h2>
            <p class="text-slate-500 dark:text-slate-400 mt-1 text-sm">{{ pesanMotivasi }}</p>
          </div>
          <div class="text-4xl font-black text-emerald-500 dark:text-emerald-400">{{ statsKanban.persentase }}%</div>
        </div>

        <div class="relative w-full h-8 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner transition-colors">
          <div 
            class="absolute top-0 left-0 h-full bg-linear-to-r from-emerald-400 to-emerald-600 transition-all duration-1000 ease-out flex items-center justify-end pr-4"
            :style="{ width: `${statsKanban.persentase}%` }"
          >
            <div class="absolute inset-0 bg-white/20 w-full h-full" style="background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent); background-size: 1rem 1rem;"></div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-300">
        <h2 class="text-xl font-bold text-slate-800 dark:text-white mb-6">Status Pengerjaan</h2>
        
        <div class="space-y-5">
          <div>
            <div class="flex justify-between text-sm font-medium mb-2">
              <span class="text-slate-600 dark:text-slate-300 flex items-center"><CircleDashed class="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500"/> Belum Mulai</span>
              <span class="text-slate-800 dark:text-white">{{ statsKanban.todo }}</span>
            </div>
            <div class="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden transition-colors">
              <div class="h-full bg-slate-400 dark:bg-slate-500 transition-all duration-1000" :style="{ width: `${(statsKanban.todo / statsKanban.total) * 100}%` }"></div>
            </div>
          </div>

          <div>
            <div class="flex justify-between text-sm font-medium mb-2">
              <span class="text-amber-700 dark:text-amber-400 flex items-center"><Timer class="w-4 h-4 mr-2 text-amber-500 dark:text-amber-400"/> Sedang Dikerjakan</span>
              <span class="text-amber-800 dark:text-amber-300">{{ statsKanban.progress }}</span>
            </div>
            <div class="w-full h-2 bg-amber-100 dark:bg-amber-500/20 rounded-full overflow-hidden transition-colors">
              <div class="h-full bg-amber-500 transition-all duration-1000 delay-300" :style="{ width: `${(statsKanban.progress / statsKanban.total) * 100}%` }"></div>
            </div>
          </div>

          <div>
            <div class="flex justify-between text-sm font-medium mb-2">
              <span class="text-emerald-700 dark:text-emerald-400 flex items-center"><CheckCircle2 class="w-4 h-4 mr-2 text-emerald-500 dark:text-emerald-400"/> Selesai</span>
              <span class="text-emerald-800 dark:text-emerald-300">{{ statsKanban.done }}</span>
            </div>
            <div class="w-full h-2 bg-emerald-100 dark:bg-emerald-500/20 rounded-full overflow-hidden transition-colors">
              <div class="h-full bg-emerald-500 transition-all duration-1000 delay-500" :style="{ width: `${(statsKanban.done / statsKanban.total) * 100}%` }"></div>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>