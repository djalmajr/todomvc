import { wire } from "hyperhtml";
import controller from "../controllers/todos";
import styles from "./todo.less";

function handleBlur(evt) {
  const li = evt.target.closest("li");
  li.classList.remove(styles.editing);
}

function handleChange(evt) {
  const li = evt.target.closest("li");
  controller.toggle(li.dataset.uid);
}

function handleEdit(evt) {
  const li = evt.target.closest("li");
  li.classList.add(styles.editing);
  li.querySelector(`.${styles.edit}`).select();
}

function handleKeyUp(evt) {
  const text = evt.target.value.trim();
  const li = evt.target.closest("li");

  if (evt.key === "Enter" && text) {
    controller.edit(li.dataset.uid, text);
    li.classList.remove(styles.editing);
  } else if (evt.key === "Escape") {
    li.classList.remove(styles.editing);
  }
}

function handleRemove(evt) {
  const li = evt.target.closest("li");
  controller.remove(li.dataset.uid);
}

export default todo => {
  const { uid, text, completed } = todo;
  const liClass = `${styles.todo} ${completed && styles.completed}`;

  return wire(todo)`
    <li data-uid=${uid} class=${liClass}>
      <div class=${styles.view}>
        <input
          type="checkbox"
          class=${styles.toggle}
          checked=${completed}
          onchange=${handleChange}
        />
        <label ondblclick=${handleEdit}>${text}</label>
        <button class=${styles.destroy} onclick=${handleRemove} />
      </div>
      <input
        value=${text}
        class=${styles.edit}
        onblur=${handleBlur}
        onkeyup=${handleKeyUp}
      />
    </li>
  `;
};
