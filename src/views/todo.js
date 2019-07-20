import { html } from "https://unpkg.com/lit-html?module";
import controller from "../controllers/todos.js";

addStyleSheet(__dirname + "/todo.css");

function handleBlur(evt) {
  const li = evt.target.closest("li");
  li.classList.remove("todo-item--editing");
}

function handleChange(evt) {
  const li = evt.target.closest("li");
  controller.toggle(li.dataset.uid);
}

function handleEdit(evt) {
  const li = evt.target.closest("li");
  li.classList.add("todo-item--editing");
  li.querySelector(".todo-item__edit").select();
}

function handleKeyUp(evt) {
  const text = evt.target.value.trim();
  const li = evt.target.closest("li");

  if (evt.key === "Enter" && text) {
    controller.edit(li.dataset.uid, text);
    li.classList.remove("todo-item--editing");
  } else if (evt.key === "Escape") {
    li.classList.remove("todo-item--editing");
  }
}

function handleRemove(evt) {
  const li = evt.target.closest("li");
  controller.remove(li.dataset.uid);
}

export default todo => {
  const { uid, text, completed } = todo;
  const liClass = `todo-item ${completed && "todo-item--completed"}`;

  return html`
    <li data-uid=${uid} class=${liClass}>
      <div class="todo-item__view">
        <input
          type="checkbox"
          class="todo-item__toggle"
          ?checked=${completed}
          @change=${handleChange}
        />
        <label @dblclick=${handleEdit}>${text}</label>
        <button class="todo-item__destroy" @click=${handleRemove} />
      </div>
      <input
        value=${text}
        class="todo-item__edit"
        @blur=${handleBlur}
        @keyup=${handleKeyUp}
      />
    </li>
  `;
};
