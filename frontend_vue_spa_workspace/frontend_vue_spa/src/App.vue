<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
:root {
  --primary-color: #3b82f6;
  --secondary-color: #64748b;
  --accent-color: #f59e42;
}

[data-theme='dark'] {
  --color-background: #181818;
  --color-background-soft: #222;
  --color-background-mute: #282828;
  --color-border: rgba(84, 84, 84, 0.48);
  --color-text: #f0f6fa;
  --primary-color: #3b82f6;
  --secondary-color: #9ba1b7;
  --accent-color: #f59e42;
}
</style>
