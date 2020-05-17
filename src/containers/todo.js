import React, { useRef, useState } from "react";
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

  return (
    <li className={cname}>
      <div className="todo__view">
        <input
          type="checkbox"
          className="todo__toggle"
          checked={todo.completed}
          onChange={() => toggleTodo(todo)}
        />
        <label onDoubleClick={handleDblClick}>{todo.text}</label>
        <button className="todo__destroy" onClick={() => removeTodo(todo)} />
      </div>
      <input
        ref={inputRef}
        className="todo__edit"
        defaultValue={todo.text}
        onBlur={() => setEditing(false)}
        onKeyUp={handleKeyUp}
      />
    </li>
  );
});
