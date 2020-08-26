import { Component, html, useRef, useState } from "uland";
import { classNames as cn } from "../helpers";

function TodoItem({ todo, visible, onEdit, onRemove, onToggle }) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);

  const handleDblClick = () => {
    setEditing(true);
    setTimeout(() => inputRef.current.select());
  };

  const handleKeyUp = (evt) => {
    const text = evt.target.value.trim();

    if (evt.key === "Enter" && text) {
      onEdit({ ...todo, text });
      setEditing(false);
    } else if (evt.key === "Escape") {
      setEditing(false);
    }
  };

  return html`
    <li
      .hidden=${!visible}
      class=${cn(
        "todo",
        todo.completed && "todo--completed",
        editing && "todo--editing"
      )}
    >
      <div class="todo__view">
        <input
          type="checkbox"
          class="todo__toggle"
          .checked=${todo.completed}
          onchange=${() => onToggle(todo)}
        />
        <label ondblclick=${handleDblClick}>${todo.text}</label>
        <button class="todo__destroy" onclick=${() => onRemove(todo)} />
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
}

export const Todo = Component(TodoItem);
