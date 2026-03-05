<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import {
  BookOpenCheck, CalendarDays, Clock, MapPin, Video,
  Plus, Trash2, CalendarPlus, StickyNote, CalendarClock,
  Calendar, PenLine
} from 'lucide-vue-next'

// --- STATE JADWAL ---
const jadwal = ref([])
const isFormJadwalBuka = ref(false)
const formJadwal = ref({ topik: '', tanggal: '', waktu: '', tipe: 'Tatap Muka', lokasi: '' })

// --- STATE CATATAN ---
const catatan = ref([])
const judulCatatan = ref('')
const isiCatatan = ref('')
const tabCatatan = ref('revisi') // 'revisi' atau 'umum'

// --- LIFECYCLE & AUTO-SAVE ---
onMounted(() => {
  const dataJadwal = localStorage.getItem('kawalSkripsi_jadwal')
  if (dataJadwal) jadwal.value = JSON.parse(dataJadwal)

  const dataCatatan = localStorage.getItem('kawalSkripsi_catatan')
  if (dataCatatan) catatan.value = JSON.parse(dataCatatan)
})

watch(jadwal, (val) => localStorage.setItem('kawalSkripsi_jadwal', JSON.stringify(val)), { deep: true })
watch(catatan, (val) => localStorage.setItem('kawalSkripsi_catatan', JSON.stringify(val)), { deep: true })

// --- LOGIKA JADWAL ---
const tambahJadwal = () => {
  if (!formJadwal.value.topik || !formJadwal.value.tanggal) return
  jadwal.value.push({ id: Date.now(), ...formJadwal.value })
  jadwal.value.sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal))
  formJadwal.value = { topik: '', tanggal: '', waktu: '', tipe: 'Tatap Muka', lokasi: '' }
  isFormJadwalBuka.value = false
}
const hapusJadwal = (id) => jadwal.value = jadwal.value.filter(j => j.id !== id)

const tambahKeGCal = (item) => {
  const waktuMulai = new Date(`${item.tanggal}T${item.waktu}:00`);
  const waktuSelesai = new Date(waktuMulai.getTime() + (60 * 60 * 1000));
  const formatGCal = (date) => date.toISOString().replace(/-|:|\.\d\d\d/g, '');

  const start = formatGCal(waktuMulai);
  const end = formatGCal(waktuSelesai);
  const judul = encodeURIComponent(`Bimbingan Skripsi: ${item.topik}`);
  const detail = encodeURIComponent(`Pengingat otomatis dari dashboard KawalSkripsi.\nTipe: ${item.tipe}`);
  const lokasi = encodeURIComponent(item.lokasi);

  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${judul}&dates=${start}/${end}&details=${detail}&location=${lokasi}`;
  window.open(url, '_blank');
}

// --- LOGIKA CATATAN ---
const tambahCatatan = () => {
  if (!judulCatatan.value.trim() || !isiCatatan.value.trim()) return
  catatan.value.unshift({
    id: Date.now(),
    judul: judulCatatan.value,
    isi: isiCatatan.value,
    tipe: tabCatatan.value, // Menyimpan tipe catatan (revisi/umum)
    tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  })
  judulCatatan.value = ''; isiCatatan.value = ''
}
const hapusCatatan = (id) => catatan.value = catatan.value.filter(c => c.id !== id)

// Computed untuk memfilter catatan berdasarkan tab yang aktif
const catatanTampil = computed(() => {
  return catatan.value.filter(c => {
    // Fallback: Jika catatan lama tidak punya tipe, anggap sebagai 'revisi'
    const tipeCatatan = c.tipe || 'revisi'
    return tipeCatatan === tabCatatan.value
  })
})

// --- HELPER ---
const formatTanggal = (tgl) => new Date(tgl).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
</script>

<template>
  <div class="space-y-12">

    <div class="border-b border-slate-200 dark:border-slate-700 pb-6 transition-colors duration-300">
      <h1 class="text-3xl font-bold text-slate-800 dark:text-white flex items-center">
        <BookOpenCheck class="mr-3 text-emerald-500 w-8 h-8" />
        Jurnal Bimbingan
      </h1>
      <p class="text-slate-500 dark:text-slate-400 mt-2">Atur jadwal pertemuan dengan dosen dan kelola semua catatan skripsimu.</p>
    </div>

    <section>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-slate-800 dark:text-white flex items-center">
          <CalendarDays class="w-6 h-6 mr-2 text-slate-400 dark:text-slate-500" /> Agenda Terdekat
        </h2>
        <button @click="isFormJadwalBuka = !isFormJadwalBuka"
          class="text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors">
          {{ isFormJadwalBuka ? 'Tutup Form' : '+ Jadwal Baru' }}
        </button>
      </div>

      <div v-show="isFormJadwalBuka"
        class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-emerald-200 dark:border-emerald-500/30 mb-6 animate-in fade-in slide-in-from-top-4 transition-colors duration-300">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input v-model="formJadwal.topik" type="text" placeholder="Topik (misal: Cek Bab 4)"
            class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 dark:text-white dark:placeholder-slate-500 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none md:col-span-2 transition-colors" />
          <input v-model="formJadwal.tanggal" type="date"
            class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 dark:text-white rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-colors" />
          <input v-model="formJadwal.waktu" type="time"
            class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 dark:text-white rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-colors" />
          <select v-model="formJadwal.tipe"
            class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 dark:text-white rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-colors">
            <option value="Tatap Muka">Tatap Muka</option>
            <option value="Online">Online</option>
          </select>
          <input v-model="formJadwal.lokasi" type="text" placeholder="Lokasi/Link"
            class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 dark:text-white dark:placeholder-slate-500 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-colors" />
          <div class="md:col-span-2 flex justify-end mt-2">
            <button @click="tambahJadwal"
              class="px-6 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium rounded-xl hover:bg-slate-800 dark:hover:bg-white transition-all">
              Simpan Jadwal
            </button>
          </div>
        </div>
      </div>

      <div v-if="jadwal.length === 0"
        class="text-center py-8 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm transition-colors duration-300">
        Belum ada jadwal bimbingan.
      </div>
      
      <div v-else class="flex overflow-x-auto pb-4 gap-4 snap-x">
        <div v-for="item in jadwal" :key="item.id"
          class="snap-start shrink-0 w-80 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col overflow-hidden transition-colors duration-300">
          <div class="h-1.5 w-full" :class="item.tipe === 'Online' ? 'bg-blue-400 dark:bg-blue-500' : 'bg-emerald-400 dark:bg-emerald-500'"></div>
          <div class="p-5 flex-1">
            <div class="flex justify-between items-start mb-3">
              <span class="text-xs font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors">
                {{ formatTanggal(item.tanggal) }}
              </span>
              <div class="flex gap-2">
                <button @click="tambahKeGCal(item)"
                  class="flex items-center text-xs font-medium text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 px-2 py-1 rounded transition-colors"
                  title="Tambahkan ke Google Calendar">
                  <Calendar class="w-3.5 h-3.5 mr-1" /> Pengingat
                </button>
                <button @click="hapusJadwal(item.id)"
                  class="text-slate-300 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 p-1 rounded hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 class="font-bold text-slate-800 dark:text-white mb-2 truncate transition-colors">{{ item.topik }}</h3>
            <div class="text-xs text-slate-500 dark:text-slate-400 space-y-1.5 font-medium transition-colors">
              <div class="flex items-center"><Clock class="w-3.5 h-3.5 mr-1.5" />{{ item.waktu }} WIB</div>
              <div class="flex items-center">
                <component :is="item.tipe === 'Online' ? Video : MapPin" class="w-3.5 h-3.5 mr-1.5" />
                <span class="truncate">{{ item.lokasi }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 class="text-xl font-bold text-slate-800 dark:text-white flex items-center transition-colors">
          <PenLine class="w-6 h-6 mr-2 text-slate-400 dark:text-slate-500" /> Buku Catatan
        </h2>
        
        <div class="flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 w-fit transition-colors">
          <button @click="tabCatatan = 'revisi'" 
            class="px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center"
            :class="tabCatatan === 'revisi' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'">
            <StickyNote class="w-4 h-4 mr-2"/> Revisi Dosen
          </button>
          <button @click="tabCatatan = 'umum'" 
            class="px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center"
            :class="tabCatatan === 'umum' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'">
            <BookOpenCheck class="w-4 h-4 mr-2"/> Catatan Biasa
          </button>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border mb-6 transition-colors duration-300" 
           :class="tabCatatan === 'revisi' ? 'border-slate-200 dark:border-slate-700' : 'border-blue-100 dark:border-blue-900/50'">
        <div class="space-y-3">
          <input v-model="judulCatatan" type="text" 
            :placeholder="tabCatatan === 'revisi' ? 'Topik Revisi (misal: Perbaikan Bab 3)' : 'Judul Catatan (misal: Ide Judul Skripsi)'"
            class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 dark:text-white dark:placeholder-slate-500 rounded-xl outline-none transition-colors" 
            :class="tabCatatan === 'revisi' ? 'focus:ring-2 focus:ring-emerald-500' : 'focus:ring-2 focus:ring-blue-500'" />
            
          <textarea v-model="isiCatatan" rows="2" 
            :placeholder="tabCatatan === 'revisi' ? 'Detail masukan dari dosen...' : 'Tuliskan idemu di sini...'"
            class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 dark:text-white dark:placeholder-slate-500 rounded-xl outline-none resize-none transition-colors"
            :class="tabCatatan === 'revisi' ? 'focus:ring-2 focus:ring-emerald-500' : 'focus:ring-2 focus:ring-blue-500'"></textarea>
            
          <div class="flex justify-end">
            <button @click="tambahCatatan" :disabled="!judulCatatan || !isiCatatan"
              class="px-6 py-2.5 text-white font-medium rounded-xl disabled:opacity-50 transition-all"
              :class="tabCatatan === 'revisi' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-blue-500 hover:bg-blue-600'">
              Simpan {{ tabCatatan === 'revisi' ? 'Revisi' : 'Catatan' }}
            </button>
          </div>
        </div>
      </div>

      <div v-if="catatanTampil.length === 0"
        class="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-medium transition-colors duration-300">
        {{ tabCatatan === 'revisi' ? 'Skripsimu aman! Belum ada catatan revisi.' : 'Belum ada catatan biasa yang ditambahkan.' }}
      </div>
      
      <TransitionGroup v-else name="list" tag="div" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="item in catatanTampil" :key="item.id"
          class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all relative group flex flex-col"
          :class="item.tipe === 'umum' ? 'border-l-4 border-l-blue-400 dark:border-l-blue-500' : 'border-l-4 border-l-emerald-400 dark:border-l-emerald-500'">
          
          <h3 class="font-bold text-lg text-slate-800 dark:text-white mb-2 transition-colors">{{ item.judul }}</h3>
          <p class="text-slate-600 dark:text-slate-300 text-sm whitespace-pre-wrap mb-6 flex-1 transition-colors">{{ item.isi }}</p>
          
          <div class="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-700 transition-colors">
            <span class="text-xs text-slate-400 dark:text-slate-500 flex items-center">
              <CalendarClock class="w-3 h-3 mr-1" />{{ item.tanggal }}
            </span>
            <button @click="hapusCatatan(item.id)" class="text-slate-300 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-500/10">
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
      </TransitionGroup>
    </section>

  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.overflow-x-auto::-webkit-scrollbar {
  display: none;
}

.overflow-x-auto {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>