import { Component as $, html, useRef, useState } from "uland";
import { useTodos } from "../contexts/todos";
import cn from "../helpers/classNames";
import "./todo.css";

const isVisible = (hash, todo) => {
  switch (hash) {
    case "active":
      return !todo.completed;
    case "completed":
      return todo.completed;
    default:
      return true;
  }
};

export const Todo = $(({ todo }) => {
  const { hash, editTodo, removeTodo, toggleTodo } = useTodos();
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);

  const handleDblClick = () => {
    setEditing(true);
    setTimeout(() => inputRef.current.select());
  };

  const handleKeyUp = (evt) => {
    const text = evt.target.value.trim();

    if (evt.key === "Enter" && text) {
      editTodo({ ...todo, text });
      setEditing(false);
    } else if (evt.key === "Escape") {
      setEditing(false);
    }
  };

  const cname = cn(
    "todo",
    todo.completed && "todo--completed",
    editing && "todo--editing"
  );

  return html`
    <li class=${cname} .hidden=${!isVisible(hash, todo)}>
      <div class="todo__view">
        <input
          type="checkbox"
          class="todo__toggle"
          .checked=${todo.completed}
          onchange=${() => toggleTodo(todo)}
        />
        <label ondblclick=${handleDblClick}>${todo.text}</label>
        <button class="todo__destroy" onclick=${() => removeTodo(todo)} />
      </div>
      <input
        ref=${inputRef}
        class="todo__edit"
        .value=${todo.text}
        onblur=${() => setEditing(false)}
        onkeyup=${handleKeyUp}
      />
    </li>
  `;
});
