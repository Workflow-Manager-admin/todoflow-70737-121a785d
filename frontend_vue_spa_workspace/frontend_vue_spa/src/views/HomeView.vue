<script setup lang="ts">
import TodoInput from '../components/TodoInput.vue'
import TodoList from '../components/TodoList.vue'
import TodoFilters from '../components/TodoFilters.vue'
import ThemeToggle from '../components/ThemeToggle.vue'
import { useTodoStore } from '../stores/todo'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const todoStore = useTodoStore()
const { filteredTodos, filter } = storeToRefs(todoStore)

onMounted(() => {
  todoStore.load()
})

// Event handlers
function addTodo(text: string) {
  todoStore.addTodo(text)
}
function toggleTodo(id: string) {
  todoStore.toggleTodo(id)
}
function deleteTodo(id: string) {
  todoStore.deleteTodo(id)
}
function editTodo(payload: { id: string; text: string }) {
  todoStore.editTodo(payload)
}
import type { FilterType } from '../stores/todo'

function setFilter(newFilter: FilterType) {
  todoStore.setFilter(newFilter)
}
</script>

<template>
  <main class="todo-main">
    <header class="todo-header">
      <h1 class="title">To-Do</h1>
      <ThemeToggle />
    </header>
    <TodoInput @add="addTodo" />
    <TodoFilters :filter="filter" @update:filter="setFilter" />
    <TodoList
      :todos="filteredTodos"
      :filter="filter"
      @toggle="toggleTodo"
      @delete="deleteTodo"
      @edit="editTodo"
    />
    <footer class="footer">
      <span>🟧 Built with Vue 3</span>
    </footer>
  </main>
</template>

<style scoped>
.todo-main {
  max-width: 460px;
  margin: 0 auto;
  padding: 1.45em 0.9em 2em 0.9em;
  display: flex;
  flex-direction: column;
  min-height: 92vh;
}

.todo-header {
  display: flex;
  align-items: center;
  gap: 0.85em;
  justify-content: flex-start;
  margin: 0 0 1.1em 0;
}
.title {
  font-size: 2.3em;
  font-weight: 800;
  letter-spacing: -2px;
  color: var(--primary-color);
  line-height: 1.3;
  text-shadow: 0 2px 10px rgba(59,130,246,0.17);
}
.footer {
  text-align: center;
  color: var(--secondary-color);
  margin-top: auto;
  margin-bottom: 3vw;
  opacity: 0.64;
  font-size: 0.99em;
  letter-spacing: 0.8px;
}
@media (max-width: 600px) {
  .todo-main {
    padding: 1em 0.3em 2em 0.3em;
    min-height: 100vh;
  }
  .title {
    font-size: 1.45em;
  }
}
</style>
