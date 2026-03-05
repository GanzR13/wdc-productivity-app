import { ref, watch, onMounted } from 'vue'

// State global (dibagikan ke semua komponen yang memanggilnya)
export const isDark = ref(false)

// Fungsi untuk inisialisasi tema saat web pertama kali dibuka
export const initTheme = () => {
  onMounted(() => {
    // Cek LocalStorage atau preferensi sistem pengguna
    const temaLokal = localStorage.getItem('kawalSkripsi_tema')
    if (temaLokal === 'dark' || (!temaLokal && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      isDark.value = true
      document.documentElement.classList.add('dark')
    }
  })

  // Pantau perubahan dan simpan ke LocalStorage & Tag HTML
  watch(isDark, (nilaiBaru) => {
    if (nilaiBaru) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('kawalSkripsi_tema', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('kawalSkripsi_tema', 'light')
    }
  })
}

// Fungsi untuk tombol toggle
export const toggleTheme = () => {
  isDark.value = !isDark.value
}