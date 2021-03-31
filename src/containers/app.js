import html from "../helpers/html.js";
import store, { filterTodos } from "../store.js";
import Footer from "./Footer.js";
import Header from "./Header.js";
import Todo from "./Todo.js";

export default function () {
  const { route, todos } = store;
  const filtered = filterTodos(route.pathname, todos);

  return html`
    <div class="app__container">
      <section class="app__content">
        ${Header()}
        <section class="app__todos">
          <ul>
            ${filtered.map(Todo)}
          </ul>
        </section>
        ${Footer()}
      </section>
      <footer class="app__info">
        <p>Double-click to edit a todo</p>
        <p>Written by <a href="https://djalmajr.com">Djalma Jr.</a></p>
        <p>Not (yet 😆) part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    </div>
  `;
}
