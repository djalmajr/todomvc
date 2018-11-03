import h from "hyperhtml";
import cn from "classnames";
import renderButton from "../components/button";
import renderInput from "../components/input";
import store from "../store";
import styles from "./main.less";

const getTodo = evt => {
  const li = evt.target.closest("li");
  return store.todos[li.dataset.id];
};

const handleBlur = evt => {
  const todo = getTodo(evt);
  evt.target.value = todo.text;
  evt.target.closest("li").classList.remove(styles.editing);
};

const handleChange = evt => {
  store.toggleTodo(getTodo(evt));
};

const handleEdit = evt => {
  const li = evt.target.closest("li");
  li.classList.add(styles.editing);
  li.querySelector(`.${styles.edit}`).select();
};

const handleKeyUp = evt => {
  const text = evt.target.value.trim();
  const li = evt.target.closest("li");
  const todo = getTodo(evt);

  if (evt.key === "Enter" && text) {
    store.updateTodo({ ...todo, text });
    li.classList.remove(styles.editing);
  } else if (evt.key === "Escape") {
    evt.target.value = todo.text;
    li.classList.remove(styles.editing);
  }
};

const handleRemove = evt => {
  store.removeTodo(getTodo(evt));
};

const renderTodo = todo => {
  const { id, text, completed } = todo;

  return h.wire(todo)`
    <li data-id=${id} class=${cn({ [styles.completed]: completed })}>
      <div class=${styles.view}>
        <input
          type="checkbox"
          class=${styles.toggle}
          checked=${completed}
          onchange=${handleChange}
        />
        <label ondblclick=${handleEdit}>${text}</label>
        ${renderButton({
          className: styles.destroy,
          onClick: handleRemove,
        })}
      </div>
      ${renderInput({
        className: styles.edit,
        value: text,
        onBlur: handleBlur,
        onKeyUp: handleKeyUp,
      })}
    </li>
  `;
};

export default () => h.wire()`
  <section class=${styles.container}>
    <ul class=${styles.list}>
      ${store.filteredTodos.map(renderTodo)}
    </ul>
  </section>
`;
