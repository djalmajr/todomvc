import cn from "classnames";
import { Component } from "hyperhtml";
import { reaction } from "mobx";
import renderButton from "../components/button";
import renderInput from "../components/input";
import store from "../store";
import styles from "./todo.less";

class Todo extends Component {
  constructor({ id }) {
    super().id = id;

    Object.getOwnPropertyNames(this.constructor.prototype)
      .filter(p => typeof this[p] === "function")
      .filter(p => p.match(/^(handle|render).*/g))
      .forEach(p => (this[p] = this[p].bind(this)));
  }

  get todo() {
    return store.todos[this.id] || {};
  }

  onconnected() {
    reaction(() => `${this.todo.completed}:${this.todo.text}`, this.render);
  }

  handleBlur(evt) {
    evt.target.value = store.getTodo(evt).text;
    evt.target.closest("li").classList.remove(styles.editing);
  }

  handleChange(evt) {
    store.toggleTodo(store.getTodo(evt));
  }

  handleEdit(evt) {
    const li = evt.target.closest("li");
    li.classList.add(styles.editing);
    li.querySelector(`.${styles.edit}`).select();
  }

  handleKeyUp(evt) {
    const text = evt.target.value.trim();
    const li = evt.target.closest("li");
    const todo = store.getTodo(evt);

    if (evt.key === "Enter" && text) {
      store.updateTodo({ ...todo, text });
      li.classList.remove(styles.editing);
    } else if (evt.key === "Escape") {
      evt.target.value = todo.text;
      li.classList.remove(styles.editing);
    }
  }

  handleRemove(evt) {
    store.removeTodo(store.getTodo(evt));
  }

  render() {
    const { id, text, completed } = this.todo;

    return this.html`
      <li
        data-id=${id}
        onconnected=${this}
        class=${cn(styles.todo, { [styles.completed]: completed })}
      >
        <div class=${styles.view}>
          <input
            type="checkbox"
            class=${styles.toggle}
            checked=${completed}
            data-call="handleChange"
            onchange=${this}
          />
          <label data-call="handleEdit" ondblclick=${this}>${text}</label>
          ${renderButton({
            className: styles.destroy,
            onClick: this.handleRemove,
          })}
        </div>
        ${renderInput({
          className: styles.edit,
          value: text,
          onBlur: this.handleBlur,
          onKeyUp: this.handleKeyUp,
        })}
      </li>
    `;
  }
}

export default Todo;
