import { html } from "htm/preact";
import { withTodos } from "../contexts";
import { filterTodos } from "../utils";
import { Footer } from "./footer";
import { Header } from "./header";
import { Todo } from "./todo";
import "./app.css";

export const App = withTodos(({ hash, todos }) => {
  const filtered = filterTodos(hash, todos);

  return html`
    <div class="app__container">
      <section class="app__content">
        <${Header} />
        <section class="app__todos">
          <ul>
            ${filtered.map((todo) => html`<${Todo} todo=${todo} />`)}
          </ul>
        </section>
        <${Footer} />
      </section>
      <footer class="app__info">
        <p>Double-click to edit a todo</p>
        <p>Written by <a href="https://djalmajr.com">Djalma Jr.</a></p>
        <p>Not (yet 😆) part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    </div>
  `;
});
