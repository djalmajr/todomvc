import { html } from "htm/preact";
import { filterTodos, useTodos } from "../contexts";
import { classNames as cn } from "../helpers";
import "./header.css";

export const Header = () => {
  const { addTodo, hash, todos, toggleAllTodos } = useTodos();
  const filtered = filterTodos(hash, todos);
  const allDone = filtered.every((t) => t.completed);

  const handleAdd = (evt) => {
    const text = evt.target.value.trim();

    if (evt.key === "Enter" && text) {
      evt.target.value = "";
      addTodo(text);
    }
  };

  return html`
    <header class="header">
      <h1 class="header__title">todos</h1>
      <div hidden=${!filtered.length}>
        <input
          id="toggle-all"
          type="checkbox"
          class=${cn('header__toggle-all', allDone && "header__toggle-all--checked")}
          checked=${allDone}
          onchange=${toggleAllTodos}
        />
        <label for="toggle-all">Mark all as complete</label>
      </div>
      <input
        autofocus
        class="header__input"
        placeholder="What needs to be done?"
        onkeypress=${handleAdd}
      />
    </header>
  `;
};
