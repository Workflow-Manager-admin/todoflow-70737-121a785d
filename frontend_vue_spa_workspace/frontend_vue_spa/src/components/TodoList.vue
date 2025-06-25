<script setup lang="ts">
import { ref, nextTick } from 'vue'

const props = defineProps<{
  todos: {
    id: string
    text: string
    completed: boolean
  }[]
  filter: string
}>()
const emit = defineEmits(['toggle', 'delete', 'edit'])

const editingId = ref<string | null>(null)
const editInputValue = ref('')
const deleteDialogId = ref<string | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

// PUBLIC_INTERFACE
function startEditing(id: string, text: string) {
  editingId.value = id
  editInputValue.value = text
  nextTick(() => {
    inputRef.value?.focus()
  })
}

function stopEditing(save = false) {
  if (save && editingId.value && editInputValue.value.trim() !== '') {
    emit('edit', { id: editingId.value, text: editInputValue.value.trim() })
  }
  editingId.value = null
  editInputValue.value = ''
}

// PUBLIC_INTERFACE
function showDeleteDialog(id: string) {
  deleteDialogId.value = id
}
function confirmDelete(id: string) {
  emit('delete', id)
  deleteDialogId.value = null
}
function cancelDelete() {
  deleteDialogId.value = null
}
</script>

<template>
  <div class="todo-list" v-if="props.todos.length">
    <div
      v-for="todo in props.todos"
      :key="todo.id"
      class="todo-card"
      :class="[{ completed: todo.completed }]"
    >
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="$emit('toggle', todo.id)"
        :aria-label="todo.completed ? 'Mark active' : 'Mark completed'"
        class="todo-checkbox"
      />
      <div v-if="editingId === todo.id" class="edit-wrapper">
        <input
          ref="inputRef"
          v-model="editInputValue"
          type="text"
          maxlength="100"
          class="edit-input"
          @keydown.enter="stopEditing(true)"
          @keydown.esc="stopEditing(false)"
          @blur="stopEditing(true)"
        />
      </div>
      <div
        v-else
        class="todo-text"
        :tabindex="0"
        @dblclick="startEditing(todo.id, todo.text)"
        :aria-label="'Edit '+todo.text"
      >
        {{ todo.text }}
      </div>
      <button
        class="delete-btn"
        @click="showDeleteDialog(todo.id)"
        aria-label="Delete"
        title="Delete"
      >
        ×
      </button>

      <div v-if="deleteDialogId === todo.id" class="delete-dialog-backdrop">
        <div class="delete-dialog">
          <span>Delete this task?</span>
          <div class="delete-actions">
            <button class="btn-confirm" @click="confirmDelete(todo.id)">Delete</button>
            <button class="btn-cancel" @click="cancelDelete">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p v-else class="empty-state">No to-do items.</p>
</template>

<style scoped>
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 0.8em;
}
.todo-card {
  background: var(--color-background-soft);
  border: 1.5px solid var(--color-border);
  border-radius: 10px;
  box-shadow: 0 2px 10px 0 rgba(59,130,246,0.03);
  padding: 0.85em 1em;
  display: flex;
  align-items: center;
  gap: 1em;
  position: relative;
  transition: border 0.18s, box-shadow 0.18s;
}
.todo-card:hover {
  border-color: var(--primary-color);
  box-shadow: 0 4px 16px 2px rgba(59,130,246,0.13);
}
.completed .todo-text {
  text-decoration: line-through;
  color: #bbb;
  opacity: 0.7;
}
.todo-checkbox {
  appearance: none;
  width: 21px;
  height: 21px;
  border: 2px solid var(--secondary-color);
  border-radius: 5px;
  margin-right: 7px;
  cursor: pointer;
  outline: none;
  background: #fff;
  transition: border-color 0.2s, background 0.2s;
  position: relative;
}
.todo-checkbox:checked {
  background: var(--accent-color);
  border-color: var(--accent-color);
}
.todo-checkbox:checked::after {
  content: "";
  position: absolute;
  display: inline-block;
  left: 5px;
  top: 2px;
  width: 6px;
  height: 12px;
  border: solid #fff;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}
.todo-text,
.edit-wrapper {
  flex: 1 1 auto;
  font-size: 1.11em;
  min-width: 0;
  overflow-wrap: break-word;
  cursor: pointer;
}
.edit-input {
  width: 100%;
  padding: 0.5em 0.9em;
  border: 1.5px solid var(--primary-color);
  border-radius: 7px;
  font-size: 1em;
  background: var(--color-background);
  color: var(--color-text);
}
.delete-btn {
  background: none;
  border: none;
  color: var(--secondary-color);
  font-size: 1.5em;
  font-weight: bold;
  cursor: pointer;
  margin-left: 7px;
  opacity: 0.58;
  transition: color 0.15s, opacity 0.15s;
}
.todo-card:hover .delete-btn {
  color: var(--accent-color);
  opacity: 1;
}
.delete-dialog-backdrop {
  position: absolute;
  inset: 0;
  background:rgba(32,32,35,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}
.delete-dialog {
  background: var(--color-background);
  border: 1.5px solid var(--color-border);
  border-radius: 7px;
  box-shadow: 0 2px 15px 2px rgba(59,130,246,0.11);
  padding: 1.2em 1.5em;
  z-index: 10;
  text-align: center;
}
.delete-actions {
  display: flex;
  gap: 1em;
  margin-top: 0.75em;
  justify-content: center;
}
.btn-confirm {
  background: var(--accent-color);
  color: #fff;
  border: none;
  padding: 0.45em 1.11em;
  border-radius: 6px;
  font-size: 1.06em;
  cursor: pointer;
}
.btn-cancel {
  background: transparent;
  color: var(--secondary-color);
  border: 1.3px solid var(--color-border);
  padding: 0.42em 1em;
  border-radius: 6px;
  font-size: 1em;
  cursor: pointer;
}
.empty-state {
  color: var(--secondary-color);
  text-align: center;
  opacity: 0.57;
  margin-top: 2.5em;
}
@media (max-width: 640px) {
  .todo-card {
    padding: 0.7em 0.70em;
    font-size: 0.98em;
  }
}
</style>
