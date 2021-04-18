import curry from "~/helpers/curry";
import html from "~/helpers/html";
import store, { filterTodos } from "~/store";
import "./Footer.css";

const getClassName = curry((curr, value) => (curr === value ? "selected" : ""));

const links = {
  "/all": "All",
  "/active": "Active",
  "/completed": "Completed",
};

export default function Footer() {
  const { clearCompletedTodos, route, todos } = store;
  const getCN = getClassName(route.pathname);
  const visible = !!filterTodos("/all", todos).length;
  const showClear = !!filterTodos("/completed", todos).length;
  const remaining = filterTodos("/active", todos).length;

  return html`
    <footer ?hidden=${!visible} class="footer__container">
      <span class="footer__count">
        <strong>${remaining}</strong> item${~-remaining ? "s" : ""} left
      </span>
      <ul class="footer__filters">
        ${Object.entries(links).map(
          ([href, text]) => html`
            <li><a ?class="${getCN(href)}" href=${`#${href}`}>${text}</a></li>
          `
        )}
      </ul>
      <button
        class="footer__clear"
        ?hidden=${!showClear}
        @click=${clearCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  `;
}
