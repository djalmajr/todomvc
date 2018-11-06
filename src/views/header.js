import { wire } from "hyperhtml";
import controller from "../controllers/todos";
import styles from "./header.less";

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
    return wire()`${[]}`;
  }

  return wire()`
    <input
      id="toggle-all"
      type="checkbox"
      class=${`${styles.toggle} ${controller.allDone && styles.checked}`}
      checked=${controller.allDone}
      onchange=${() => controller.toggleAll()}
    />
    <label for="toggle-all">Mark all as complete</label>
  `;
}

export default html => html`
  <header class=${styles.container}>
    <h1>todos</h1>
    ${renderToggle()}
    <input
      autofocus
      class=${styles.input}
      placeholder="What needs to be done?"
      onkeypress=${handleKeyPress}
    />
  </header>
`;
