<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const isDark = ref(false)

// PUBLIC_INTERFACE
function toggleTheme() {
  isDark.value = !isDark.value
  applyTheme()
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  localStorage.setItem('themeMode', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  const val = localStorage.getItem('themeMode')
  if (val) {
    isDark.value = val === 'dark'
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDark.value = true
  }
  applyTheme()
})
watch(isDark, applyTheme)
</script>

<template>
  <button class="theme-toggle" @click="toggleTheme" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
    <span v-if="isDark">🌙</span>
    <span v-else>☀️</span>
  </button>
</template>

<style scoped>
.theme-toggle {
  background: var(--color-background);
  border: 1.5px solid var(--color-border);
  color: var(--primary-color);
  font-size: 1.35em;
  padding: 0.28em 0.68em;
  border-radius: 7px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  margin-left: auto;
  margin-right: 2px;
}
.theme-toggle:active {
  background: var(--color-background-mute);
}
</style>
