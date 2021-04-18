import cn from '~/helpers/classNames';
import html from '~/helpers/html';
import store from '~/store';
import './Todo.css';

const getByDataUID = (uid) => document.querySelector(`[data-uid="${uid}"]`);

export default function Todo(todo) {
  const { editTodo, removeTodo, toggleTodo } = store;

  const showEdit = (show) => {
    const li = getByDataUID(todo.uid);

    if (show) {
      li.classList.add('todo--editing');
      li.querySelector('.todo__edit').select();
    } else {
      li.classList.remove('todo--editing');
    }
  };

  const handleKeyUp = (evt) => {
    switch (evt.key) {
      case 'Enter':
        editTodo(todo, evt.target.value.trim());
      // eslint-disable-next-line no-fallthrough
      case 'Escape':
        getByDataUID(todo.uid).classList.remove('todo--editing');
        break;
    }
  };

  return html`
    <li
      data-uid=${todo.uid}
      class=${cn('todo', todo.completed && 'todo--completed')}
    >
      <div class="todo__view">
        <input
          type="checkbox"
          class="todo__toggle"
          ?checked=${todo.completed}
          @change=${() => toggleTodo(todo)}
        />
        <label @dblclick=${() => showEdit(true)}>${todo.text}</label>
        <button class="todo__destroy" @click=${() => removeTodo(todo)}></button>
      </div>
      <input
        class="todo__edit"
        value=${todo.text}
        @blur=${() => showEdit(false)}
        @keyup=${handleKeyUp}
      />
    </li>
  `;
}
