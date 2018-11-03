import h from "hyperhtml";
import cn from "classnames";
import renderButton from "../components/button";
import renderCheckbox from "../components/checkbox";
import renderInput from "../components/input";
import store from "../store";
import styles from "./todos.less";

const getTodo = evt => {
  const li = evt.target.closest("li");
  return store.todos[li.dataset.id];
};

const hideInput = evt => {
  const li = evt.target.closest("li");
  const input = li.querySelector(`.${styles.input}`);

  li.classList.remove(styles.editing);
  input.classList.remove(styles.show);
};

const handleBlur = evt => {
  evt.target.value = getTodo(evt).text;
  hideInput(evt);
};

const handleChange = evt => {
  store.toggleTodo(getTodo(evt));
};

const handleEdit = evt => {
  const li = evt.target.closest("li");
  const input = li.querySelector(`.${styles.input}`);

  li.classList.add(styles.editing);
  input.classList.add(styles.show);
  input.select();
};

const handleKeyUp = evt => {
  const text = evt.target.value.trim();

  if (evt.key === "Enter" && text) {
    const todo = getTodo(evt);
    store.updateTodo({ ...todo, text });
    hideInput(evt);
  } else if (evt.key === "Escape") {
    handleBlur(evt);
  }
};

const handleRemove = evt => {
  store.removeTodo(getTodo(evt));
};

const renderTodo = todo => {
  const { id, text, completed } = todo;
  const labelClass = cn(styles.label, { [styles.completed]: completed });

  return h.wire(todo)`
    <li data-id=${id} class=${styles.li}>
      <div class="${styles.show}">
        ${renderCheckbox({
          checked: completed,
          onChange: handleChange,
        })}
        <label class="${labelClass}" ondblclick=${handleEdit}>
          ${text}
        </label>
        ${renderButton({
          className: styles.destroy,
          onClick: handleRemove,
        })}
      </div>
      ${renderInput({
        className: styles.input,
        value: text,
        onBlur: handleBlur,
        onKeyUp: handleKeyUp,
      })}
    </li>
  `;
};

export default () => h.wire()`
  <div class="${styles.container}">
    <ul class="${styles.ul}">
      ${store.filteredTodos.map(renderTodo)}
    </ul>
  </div>
`;
