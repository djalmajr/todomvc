import { html } from "htm/preact";
import { ClearButton } from "../components";
import { withTodos } from "../contexts";
import { filterTodos } from "../utils";
import "./footer.css";

const cn = (hash, curr) => (hash === curr ? "selected" : "");

export const Footer = withTodos((props) => {
  const { clearCompletedTodos, hash, todos } = props;
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
          <a class="${cn(hash, "completed")}" href="#/completed">
            Completed
          </a>
        </li>
      </ul>
      <${ClearButton}
        isEmpty=${!completed.length}
        onClick=${() => clearCompletedTodos()}
      />
    </footer>
  `;
});
