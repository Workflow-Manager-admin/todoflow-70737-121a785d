<script setup lang="ts">
const props = defineProps<{
  filter: string
}>()
const emit = defineEmits(['update:filter'])

const filters = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
]

// PUBLIC_INTERFACE
function setFilter(f: string) {
  emit('update:filter', f)
}
</script>

<template>
  <div class="filters">
    <button
      v-for="option in filters"
      :key="option.key"
      :class="['tab', { active: props.filter === option.key }]"
      @click="setFilter(option.key)"
      :aria-pressed="props.filter === option.key"
    >{{ option.label }}</button>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 1em;
  justify-content: center;
  margin: 1.3em 0 1.1em 0;
}
.tab {
  border: none;
  background: transparent;
  color: var(--secondary-color);
  font-size: 1.05em;
  padding: 0.38em 1.4em;
  border-radius: 100vmax;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.17s, color 0.17s;
}
.tab.active,
.tab:focus {
  background: var(--primary-color);
  color: white;
  font-weight: 600;
  box-shadow: 0 3px 18px 2px rgba(59, 130, 246, 0.10);
}
.tab:not(.active):hover {
  background: var(--color-background-mute);
  color: var(--primary-color);
}
</style>
