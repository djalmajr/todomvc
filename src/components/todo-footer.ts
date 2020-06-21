import { html, useContext } from 'haunted';
import { TodoContext } from '../contexts';
import global from './global.css';
import styles from './todo-footer.css';

type TodoFooterElement = HTMLElement & {
  empty: boolean;
  visible: boolean;
  remaining: number;
};

export function TodoFooter(this: TodoFooterElement) {
  const { clearCompletedTodos } = useContext(TodoContext);

  const renderClear = () => {
    if (this.empty) {
      return html``;
    }

    return html`
      <button class="clear" @click=${clearCompletedTodos}>
        Clear completed
      </button>
    `;
  };

  if (!this.visible) return html``;

  return html`
    <style>
      ${global}
      ${styles}
    </style>
    <footer class="footer__container">
      <span class="footer__count">
        <strong>${this.remaining}</strong> item${~-this.remaining ? 's' : ''}
        left
      </span>
      <ul class="footer__filters">
        <li>
          <a class="selected" href="#/">
            All
          </a>
        </li>
        <li>
          <a href="#/active">
            Active
          </a>
        </li>
        <li>
          <a href="#/completed">
            Completed
          </a>
        </li>
      </ul>
      ${renderClear()}
    </footer>
  `;
}
