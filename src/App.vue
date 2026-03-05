<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, Sun, Moon } from 'lucide-vue-next'
import Sidebar from '@/components/Sidebar.vue'

// Import fungsi tema yang baru kita buat
import { isDark, initTheme, toggleTheme } from '@/composables/useTheme.js'

initTheme() // Jalankan saat aplikasi dimuat

const isMobileMenuBuka = ref(false)
const route = useRoute()

watch(() => route.path, () => { isMobileMenuBuka.value = false })
</script>

<template>
  <div
    class="flex h-screen bg-slate-50 dark:bg-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-900 overflow-hidden transition-colors duration-300">

    <transition name="fade">
      <div v-if="isMobileMenuBuka" @click="isMobileMenuBuka = false"
        class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden"></div>
    </transition>

    <div
      class="fixed inset-y-0 left-0 z-50 transform md:relative md:translate-x-0 transition-transform duration-300 ease-in-out"
      :class="isMobileMenuBuka ? 'translate-x-0' : '-translate-x-full'">
      <Sidebar />
    </div>

    <main class="flex-1 h-screen overflow-y-auto w-full relative">

      <header
        class="md:hidden bg-white dark:bg-slate-800 shadow-sm h-16 flex items-center justify-between px-4 sticky top-0 z-30 transition-colors duration-300">
        <div class="flex items-center">
          <div class="w-6 h-6 rounded bg-emerald-500 mr-2 flex items-center justify-center">
            <span class="text-white font-bold text-xs">K</span>
          </div>
          <h1 class="text-lg font-bold text-slate-800 dark:text-white">Kawal<span
              class="text-emerald-500">Skripsi</span></h1>
        </div>

        <div class="flex items-center gap-2">
          <button @click="toggleTheme"
            class="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
            <Sun v-if="isDark" class="w-5 h-5" />
            <Moon v-else class="w-5 h-5" />
          </button>

          <button @click="isMobileMenuBuka = true"
            class="p-2 -mr-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
            <Menu class="w-6 h-6" />
          </button>
        </div>
      </header>

      <div class="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>