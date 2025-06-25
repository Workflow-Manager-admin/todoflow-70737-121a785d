import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import TodoList from "../TodoList.vue"

describe("TodoList.vue", () => {
  it("emits toggle event with correct id when checkbox is changed", async () => {
    const todos = [
      { id: "1", text: "Test", completed: false },
      { id: "2", text: "Another", completed: true }
    ]
    const wrapper = mount(TodoList, {
      props: {
        todos,
        filter: "all"
      }
    })

    const checkboxes = wrapper.findAll("input[type='checkbox']")
    await checkboxes[0].trigger("change")
    expect(wrapper.emitted("toggle")).toBeTruthy()
    expect(wrapper.emitted("toggle")![0][0]).toBe("1")
  })
})
