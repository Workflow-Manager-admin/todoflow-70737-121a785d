import { describe, it, expect, beforeEach } from "vitest"
import { setActivePinia, createPinia } from "pinia"
import { useTodoStore } from "../../stores/todo"

describe("Todo Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    window.localStorage.clear()
  })

  it("should toggle completed status of a todo", () => {
    const store = useTodoStore()
    store.addTodo("Task A")
    const id = store.todos[0].id
    expect(store.todos[0].completed).toBe(false)
    store.toggleTodo(id)
    expect(store.todos[0].completed).toBe(true)
    store.toggleTodo(id)
    expect(store.todos[0].completed).toBe(false)
  })
})
