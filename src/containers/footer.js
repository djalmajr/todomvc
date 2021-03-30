import html from "../helpers/html.js";
import store, { filterTodos } from "../store.js";

const cn = (hash, curr) => (hash === curr ? "selected" : "");

export default function Footer() {
  const { clearCompletedTodos, hash, todos } = store;
  const visible = !!filterTodos("all", todos).length;
  const showClear = !!filterTodos("completed", todos).length;
  const remaining = filterTodos("active", todos).length;

  return html`
    <footer ?hidden=${!visible} class="footer__container">
      <span class="footer__count">
        <strong>${remaining}</strong> item${~-remaining ? "s" : ""} left
      </span>
      <ul class="footer__filters">
        <li><a ?class="${cn(hash, "all")}" href="#/all">All</a></li>
        <li><a ?class="${cn(hash, "active")}" href="#/active">Active</a></li>
        <li>
          <a ?class="${cn(hash, "completed")}" href="#/completed">Completed</a>
        </li>
      </ul>
      <button class="footer__clear" ?hidden=${!showClear} @click=${clearCompletedTodos}>
        Clear completed
      </button>
    </footer>
  `;
}
