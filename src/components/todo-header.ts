import { html, useContext, useRef } from 'haunted';
import { TodoContext } from '../contexts';
import { classNames as cn, ref } from '../utils';
import global from './global.css';
import styles from './todo-header.css';

type TodoHeaderElement = HTMLElement & {
  allDone?: boolean;
  showCheck?: boolean;
};

export function TodoHeader(this: TodoHeaderElement) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { addTodo, toggleAllTodos } = useContext(TodoContext);

  const handleKeyPress = (evt: KeyboardEvent) => {
    const text = inputRef.current?.value.trim();

    if (evt.key === 'Enter' && text) {
      inputRef.current!.value = '';
      addTodo(text);
    }
  };

  const renderToggleAll = () => {
    if (!this.showCheck) {
      return '';
    }

    return html`
      <input
        id="toggle-all"
        type="checkbox"
        class="${cn('toggle-all', this.allDone && 'checked')}"
        ?checked=${this.allDone}
        @change=${toggleAllTodos}
      />
      <label for="toggle-all">Mark all as complete</label>
    `;
  };

  return html`
    <style>
      ${global}
      ${styles}
    </style>
    <header>
      <h1 class="title">todos</h1>
      ${renderToggleAll()}
      <input
        ref=${ref(inputRef)}
        autofocus
        class="input"
        placeholder="What needs to be done?"
        @keypress=${handleKeyPress}
      />
    </header>
  `;
}
