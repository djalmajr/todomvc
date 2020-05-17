import React from "react";
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
