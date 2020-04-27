import { html } from "htm/preact";
import { withTodos } from "../contexts";
import { ToggleAll } from "../components";
import { filterTodos } from "../utils";
import "./header.css";

export const Header = withTodos((props) => {
  const { addTodo, hash, todos, toggleAllTodos } = props;
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
});
