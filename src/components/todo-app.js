import { html, useContext } from "https://unpkg.com/haunted/haunted.js";
import { css } from "https://unpkg.com/lit-element/lib/css-tag.js";
import { repeat } from "https://unpkg.com/lit-html/directives/repeat.js";
import { RouterContext } from "../contexts/router.js";
import { TodoContext } from "../contexts/todos.js";
import { useStyles } from "../hooks/useStyles.js";
import { filterTodos } from "../selectors/filterTodos.js";

const style = css`
  :host {
    color: #4d4d4d;
    display: block;
    font-weight: 300;
    font: 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
    line-height: 1.4em;
    margin: 0 auto;
    max-width: 550px;
    min-width: 230px;
  }

  .content {
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
    margin: 130px 0 40px;
    position: relative;
  }

  .info {
    margin: 65px auto 0;
    color: #bfbfbf;
    font-size: 12px;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
    text-align: center;
  }

  .info p {
    line-height: 1;
  }

  .info a {
    color: inherit;
    text-decoration: none;
    font-weight: 400;
  }

  .info a:hover {
    text-decoration: underline;
  }

  .todos {
    border-top: 1px solid #e6e6e6;
    position: relative;
    z-index: 2;
  }

  .todos ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export function TodoApp() {
  const {
    addTodo,
    clearCompletedTodos,
    editTodo,
    removeTodo,
    toggleTodo,
    toggleAllTodos,
    todos,
  } = useContext(TodoContext);

  const { slug } = useContext(RouterContext);
  const filtered = filterTodos(slug, todos);
  const completed = filterTodos("/completed", todos);
  const incompleted = filterTodos("/active", todos);
  const allDone = filtered.every((t) => t.completed);
  const hasTodos = filtered.length > 0;

  useStyles(this, [style]);

  return html`
    <awc-route .match=${["/", "/active", "/completed"]}>
      <section class="content">
        <todo-header
          .allDone=${allDone}
          .showCheck=${hasTodos}
          @add=${(e) => addTodo(e.detail)}
          @toggle=${(e) => toggleAllTodos(e.detail)}
        ></todo-header>
        <section class="todos">
          <ul>
            ${repeat(
              filtered,
              (todo) => todo,
              (todo) =>
                html`
                  <todo-item
                    .todo=${todo}
                    @edit=${(e) => editTodo(e.detail)}
                    @remove=${(e) => removeTodo(e.detail)}
                    @toggle=${(e) => toggleTodo(e.detail)}
                  ></todo-item>
                `
            )}
          </ul>
        </section>
        <todo-footer
          slug=${slug}
          .empty=${!completed.length}
          .visible=${Object.keys(todos).length}
          .remaining=${incompleted.length}
          @clear=${clearCompletedTodos}
        ></todo-footer>
      </section>
      <footer class="info">
        <p>Double-click to edit a todo</p>
        <p>Written by <a href="https://djalmajr.com">Djalma Jr.</a></p>
        <p>Not part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    </awc-route>
    <awc-route match="*">
      <h1 style="margin-top:3em;text-align:center">Not Found</h1>
    </awc-route>
  `;
}