import { html } from "htm/preact";
import { useEffect } from "preact/hooks";
import { filterTodos, useTodos, todoCache } from "../contexts/todos";
import { Footer } from "./footer";
import { Header } from "./header";
import { Todo } from "./todo";
import "./app.css";

export const App = () => {
  const { hash, todos, updateHash } = useTodos();
  const filtered = filterTodos(hash, todos);

  useEffect(() => (window.onhashchange = updateHash), [updateHash]);
  useEffect(() => todoCache.set(todos), [todos]);

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
};
