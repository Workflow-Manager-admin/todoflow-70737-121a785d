import { defineStore } from 'pinia'

export type TodoItem = {
  id: string
  text: string
  completed: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

// PUBLIC_INTERFACE
export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as TodoItem[],
    filter: 'all' as FilterType,
  }),
  getters: {
    filteredTodos(state): TodoItem[] {
      if (state.filter === 'active') {
        return state.todos.filter((t) => !t.completed)
      }
      if (state.filter === 'completed') {
        return state.todos.filter((t) => t.completed)
      }
      return state.todos
    },
  },
  actions: {
    // PUBLIC_INTERFACE
    addTodo(text: string) {
      this.todos.unshift({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
        text,
        completed: false,
      })
      this.save()
    },
    // PUBLIC_INTERFACE
    deleteTodo(id: string) {
      this.todos = this.todos.filter((t) => t.id !== id)
      this.save()
    },
    // PUBLIC_INTERFACE
    toggleTodo(id: string) {
      const t = this.todos.find((t) => t.id === id)
      if (t) t.completed = !t.completed
      this.save()
    },
    // PUBLIC_INTERFACE
    editTodo(payload: { id: string; text: string }) {
      const t = this.todos.find((t) => t.id === payload.id)
      if (t) t.text = payload.text
      this.save()
    },
    // PUBLIC_INTERFACE
    setFilter(filter: FilterType) {
      this.filter = filter
      localStorage.setItem('todo_filter', filter)
    },
    // PUBLIC_INTERFACE
    save() {
      localStorage.setItem('todos_vue', JSON.stringify(this.todos))
    },
    // PUBLIC_INTERFACE
    load() {
      const items = localStorage.getItem('todos_vue')
      if (items) {
        this.todos = JSON.parse(items)
      }
      const f = localStorage.getItem('todo_filter') as FilterType | null
      if (f && ['all', 'active', 'completed'].includes(f)) {
        this.filter = f
      }
    },
  },
})
