import { html, useContext, useRef, useState } from 'haunted';
import { Todo, TodoContext } from '../contexts';
import { classNames as cn, ref } from '../utils';
import global from './global.css';
import styles from './todo-item.css';

type TodoItemElement = HTMLElement & {
  todo: Todo;
};

export function TodoItem(this: TodoItemElement) {
  const [editing, setEditing] = useState(false);
  const { completed, uid, text } = this.todo;
  const { editTodo, removeTodo, toggleTodo } = useContext(TodoContext);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const updateTodo = (evt: KeyboardEvent) => {
    const val = inputRef.current?.value.trim();

    if (evt.key === 'Enter' && val) {
      setEditing(false);
      editTodo({ ...this.todo, text: val });
    } else if (evt.key === 'Escape') {
      setEditing(false);
    }
  };

  const showInput = () => {
    setEditing(true);
    setTimeout(() => inputRef.current?.select());
  };

  return html`
    <style>
      ${global}
      ${styles}
    </style>
    <li class=${cn(completed && 'completed', editing && 'editing')}>
      <div class="view">
        <input
          type="checkbox"
          class="toggle"
          ?checked=${completed}
          @change=${() => toggleTodo(uid)}
        />
        <label @dblclick=${showInput}>${text}</label>
        <button class="destroy" @click=${() => removeTodo(uid)} />
      </div>
      <input
        class="edit"
        ref=${ref(inputRef)}
        value=${text}
        @blur=${() => setEditing(false)}
        @keyup=${updateTodo}
      />
    </li>
  `;
}
