import { html } from "https://unpkg.com/lit-html?module";
import controller from "../controllers/todos.js";

addStyleSheet(__dirname + "/header.css");

function handleKeyPress(evt) {
  const text = evt.target.value.trim();

  if (evt.key === "Enter" && text) {
    evt.target.value = "";
    controller.add(text);
    setTimeout(() => evt.target.focus());
  }
}

function renderToggle() {
  if (!controller.filtered.length) {
    return html``;
  }

  return html`
    <input
      id="toggle-all"
      type="checkbox"
      class=${`todo-header__toggle ${controller.allDone &&
        "todo-header__toggle--checked"}`}
      ?checked=${controller.allDone}
      @change=${() => controller.toggleAll()}
    />
    <label for="toggle-all">Mark all as complete</label>
  `;
}

export default () => html`
  <header class="todo-header">
    <h1>todos</h1>
    ${renderToggle()}
    <input
      autofocus
      class="todo-header__input"
      placeholder="What needs to be done?"
      @keypress=${handleKeyPress}
    />
  </header>
`;
