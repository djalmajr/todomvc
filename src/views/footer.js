import { wire } from "hyperhtml";
import controller from "../controllers/todos";
import styles from "./footer.less";

function renderClear() {
  if (!controller.completed.length) {
    return wire()`${[]}`;
  }

  return wire()`
    <button class=${styles.clear} onclick=${() => controller.clear()}>
      Clear completed
    </button>
  `;
}

function renderFilter(text) {
  const filter = text.toLowerCase();
  const className = controller.hash === filter && styles.selected;

  return wire()`
    <li><a href=${`#/${filter}`} class=${className}>${text}</a></li>
  `;
}

export default html => {
  if (!controller.todos.length) {
    return html`${[]}`;
  }

  const left = controller.incompleted.length;

  return html`
    <footer class=${styles.container}>
      <span class=${styles.count}>
        <strong>${left}</strong>
        item${~-left ? "s" : ""} left
      </span>
      <ul class=${styles.filters}>
        ${["All", "Active", "Completed"].map(renderFilter)}
      </ul>
      ${renderClear()}
    </footer>
  `;
};
