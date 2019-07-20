import { html } from "https://unpkg.com/lit-html?module";
import controller from "../controllers/todos.js";

addStyleSheet(__dirname + "/footer.css");

function renderClear() {
  if (!controller.completed.length) {
    return html``;
  }

  return html`
    <button class="todo-footer__clear" @click=${() => controller.clear()}>
      Clear completed
    </button>
  `;
}

function renderFilter(text) {
  const filter = text.toLowerCase();
  const liClass = controller.hash === filter && "todo-footer__filter--selected";

  return html`
    <li class=${`todo-footer__filter ${liClass}`}>
      <a href=${`#/${filter}`}>${text}</a>
    </li>
  `;
}

export default () => {
  if (!controller.todos.length) {
    return html``;
  }

  const left = controller.incompleted.length;

  return html`
    <footer class="todo-footer">
      <span class="todo-footer__count">
        <strong>${left}</strong>
        item${~-left ? "s" : ""} left
      </span>
      <ul class="todo-footer__filters">
        ${["All", "Active", "Completed"].map(renderFilter)}
      </ul>
      ${renderClear()}
    </footer>
  `;
};
