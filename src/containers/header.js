import React from "react";
import { ToggleAll } from "../components";
import { withTodos } from "../contexts";
import { filterTodos } from "../selectors";
import "./header.css";

export const Header = withTodos(({ addTodo, route, todos, toggleAllTodos }) => {
  const filtered = filterTodos(route.slug, todos);
  const allDone = filtered.every((t) => t.completed);

  const handleAdd = (evt) => {
    const text = evt.target.value.trim();

    if (evt.key === "Enter" && text) {
      evt.target.value = "";
      addTodo(text);
    }
  };

  return (
    <header className="header">
      <h1 className="header__title">todos</h1>
      <ToggleAll
        allDone={allDone}
        isEmpty={!filtered.length}
        onChange={toggleAllTodos}
      />
      <input
        autoFocus
        className="header__input"
        placeholder="What needs to be done?"
        onKeyPress={handleAdd}
      />
    </header>
  );
});
