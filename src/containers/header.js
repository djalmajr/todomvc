import { html } from "htm/preact";
import { ToggleAll } from "../components";
import { filterTodos, useTodos } from "../contexts";
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
      <${ToggleAll}
        allDone=${allDone}
        isEmpty=${!filtered.length}
        onChange=${toggleAllTodos}
      />
      <input
        autofocus
        class="header__input"
        placeholder="What needs to be done?"
        onkeypress=${handleAdd}
      />
    </header>
  `;
};
