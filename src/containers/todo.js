import { useRef, useState } from "preact/hooks";
import { html } from "htm/preact";
import { withTodos } from "../contexts";
import { classNames as cn } from "../utils";
import "./todo.css";

export const Todo = withTodos((props) => {
  const { editTodo, removeTodo, todo, toggleTodo } = props;
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);

  const handleDblClick = () => {
    setEditing(true);
    inputRef.current.select();
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
    <li class=${cname}>
      <div class="todo__view">
        <input
          type="checkbox"
          class="todo__toggle"
          checked=${todo.completed}
          onchange=${() => toggleTodo(todo)}
        />
        <label ondblclick=${handleDblClick}>${todo.text}</label>
        <button class="todo__destroy" onclick=${() => removeTodo(todo)} />
      </div>
      <input
        ref=${inputRef}
        class="todo__edit"
        value=${todo.text}
        onblur=${() => setEditing(false)}
        onkeyup=${handleKeyUp}
      />
    </li>
  `;
});
