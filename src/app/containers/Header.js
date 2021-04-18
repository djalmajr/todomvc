import cn from '~/helpers/classNames';
import html from '~/helpers/html';
import store, { filterTodos } from '~/store';
import './Header.css';

export default function Header() {
  const { addTodo, route, todos, toggleAllTodos } = store;
  const filtered = filterTodos(route.pathname, todos);
  const allDone = filtered.every((t) => t.completed);

  const handleAdd = (evt) => {
    const text = evt.target.value.trim();

    if (evt.key === 'Enter' && text) {
      evt.target.value = '';
      addTodo(text);
    }
  };

  return html`
    <header class="header">
      <h1 class="header__title">todos</h1>
      <div ?hidden=${!filtered.length}>
        <input
          id="toggle-all"
          type="checkbox"
          class=${cn(
            'header__toggle-all',
            allDone && 'header__toggle-all--checked'
          )}
          ?checked=${allDone}
          @change=${toggleAllTodos}
        />
        <label for="toggle-all">Mark all as complete</label>
      </div>
      <input
        autofocus
        class="header__input"
        placeholder="What needs to be done"
        @keypress=${handleAdd}
      />
    </header>
  `;
}
