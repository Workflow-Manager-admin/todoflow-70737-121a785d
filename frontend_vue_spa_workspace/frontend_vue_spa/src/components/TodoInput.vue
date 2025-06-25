<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['add'])
const task = ref('')

// PUBLIC_INTERFACE
function submitTask() {
  const trimmed = task.value.trim()
  if (trimmed.length > 0) {
    emit('add', trimmed)
    task.value = ''
  }
}
</script>

<template>
  <form class="todo-input" @submit.prevent="submitTask">
    <input
      v-model="task"
      type="text"
      class="task-field"
      placeholder="What needs to be done?"
      autocomplete="off"
      maxlength="100"
    />
    <button
      type="submit"
      :disabled="task.trim().length === 0"
      class="add-btn"
      aria-label="Add to-do"
    >
      +
    </button>
  </form>
</template>

<style scoped>
.todo-input {
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-bottom: 1.25em;
}
.task-field {
  flex: 1;
  padding: 0.7em 1em;
  border: 1.5px solid var(--color-border);
  border-radius: 8px;
  font-size: 1.1em;
  transition: border 0.2s;
  background: var(--color-background-soft);
  color: var(--color-text);
}
.task-field:focus {
  outline: none;
  border: 1.5px solid var(--accent-color);
}
.add-btn {
  background: var(--accent-color);
  color: #fff;
  border: none;
  padding: 0.7em 1.2em;
  border-radius: 8px;
  font-size: 1.7em;
  cursor: pointer;
  transition: background 0.2s;
  font-weight: 700;
}
.add-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .task-field {
    font-size: 0.99em;
    padding: 0.5em 0.8em;
  }
  .add-btn {
    font-size: 1.3em;
    padding: 0.6em 0.89em;
  }
}
</style>
