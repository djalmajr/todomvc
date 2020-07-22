import { component, html, useRef, useState } from 'haunted';
import { css } from 'lit-element/lib/css-tag';
import { classNames as cn, emit, ref } from '../helpers';
import { useStyles } from '../hooks';

const style = css`
  :host {
    font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 300;
    line-height: 1.4em;
  }

  li {
    border-bottom: 1px solid #ededed;
    font-size: 24px;
    position: relative;
  }

  li:last-child {
    border-bottom: none;
  }

  li label {
    display: block;
    line-height: 1.2;
    padding: 15px 15px 15px 60px;
    transition: color 0.4s;
    word-break: break-all;
  }

  li.completed label {
    color: #d9d9d9;
    text-decoration: line-through;
  }

  li:hover .destroy {
    display: block;
  }

  li.editing {
    border-bottom: none;
    padding: 0;
  }

  li.editing:last-child {
    margin-bottom: -1px;
  }

  li.editing .edit {
    border: none;
    display: block;
    margin: 0 0 0 43px;
    padding: 12px 16px;
    width: calc(100% - 43px);
  }

  li.editing .view {
    display: none;
  }

  .edit {
    display: none;
  }

  .toggle {
    appearance: none;
    border: none;
    bottom: 0;
    cursor: pointer;
    height: 40px;
    margin: auto 0;
    opacity: 0;
    position: absolute;
    text-align: center;
    top: 0;
    width: 40px;
  }

  .toggle + label {
    background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
    background-repeat: no-repeat;
    background-position: center left;
  }

  .toggle:checked + label {
    background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
  }

  .destroy {
    background: none;
    border: none;
    bottom: 0;
    color: #cc9a9a;
    display: none;
    font-size: 30px;
    height: 40px;
    margin: auto 0;
    position: absolute;
    right: 10px;
    top: 0;
    transition: color 0.2s ease-out;
    width: 40px;
  }

  .destroy:hover {
    color: #af5b5e;
  }

  .destroy:after {
    content: '×';
  }

  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    .toggle {
      background: none;
      height: 40px;
    }
  }
`;

export function TodoItem({ todo }) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);

  const updateTodo = (evt) => {
    const val = inputRef.current.value.trim();

    if (evt.key === 'Enter' && val) {
      setEditing(false);
      emit(this, 'edit', { ...todo, text: val });
    } else if (evt.key === 'Escape') {
      setEditing(false);
    }
  };

  const showInput = () => {
    setEditing(true);
    setTimeout(() => inputRef.current.select());
  };

  useStyles(this, [styles.button, styles.input, style]);

  return html`
    <li class=${cn(todo.completed && 'completed', editing && 'editing')}>
      <div class="view">
        <input
          type="checkbox"
          class="toggle"
          ?checked=${todo.completed}
          @change=${() => emit(this, 'toggle', todo.uid)}
        />
        <label @dblclick=${showInput}>${todo.text}</label>
        <button
          class="destroy"
          @click=${() => emit(this, 'remove', todo.uid)}
        />
      </div>
      <input
        class="edit"
        ref=${ref(inputRef)}
        value=${todo.text}
        @blur=${() => setEditing(false)}
        @keyup=${updateTodo}
      />
    </li>
  `;
}

if (!customElements.get('todo-item')) {
  customElements.define('todo-item', component(TodoItem));
}
