import { html } from "htm/preact";
import { filterTodos, useTodos } from "../contexts";
import "./footer.css";

const cn = (hash, curr) => (hash === curr ? "selected" : "");

export const Footer = () => {
  const { clearCompletedTodos, hash, todos } = useTodos();
  const allTodos = filterTodos("all", todos);
  const completed = filterTodos("completed", todos);
  const incompleted = filterTodos("incompleted", todos);
  const remaining = incompleted.length;

  if (!allTodos.length) return html``;

  return html`
    <footer class="footer__container">
      <span class="footer__count">
        <strong>${remaining}</strong> item${~-remaining ? "s" : ""} left
      </span>
      <ul class="footer__filters">
        <li><a class="${cn(hash, "all")}" href="#/all">All</a></li>
        <li><a class="${cn(hash, "active")}" href="#/active">Active</a></li>
        <li>
          <a class="${cn(hash, "completed")}" href="#/completed">Completed</a>
        </li>
      </ul>
      <button
        class="footer__clear"
        hidden=${!completed.length}
        onclick=${clearCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  `;
};
