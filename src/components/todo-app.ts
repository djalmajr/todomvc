import { html, useContext } from 'haunted';
import { repeat } from 'lit-html/directives/repeat.js';
import { TodoContext } from '../contexts';
import styles from './todo-app.css';

const { keys } = Object;

export function TodoApp() {
  const { todos } = useContext(TodoContext);

  const hasTodos = keys(todos).length > 0;

  const incompleted = keys(todos)
    .filter((uid) => !todos[uid].completed)
    .map((uid) => todos[uid]);

  const completed = keys(todos)
    .filter((uid) => todos[uid].completed)
    .map((uid) => todos[uid]);

  return html`
    <style>
      ${styles}
    </style>
    <section class="content">
      <todo-header
        .allDone=${!completed.length}
        .showCheck=${hasTodos}
      ></todo-header>
      <section class="todos">
        <ul>
          ${repeat(
            keys(todos),
            (uid) => todos[uid],
            (uid) => html`<todo-item .todo=${todos[uid]}></todo-item>`
          )}
        </ul>
      </section>
      <todo-footer
        .empty=${!hasTodos}
        .visible=${hasTodos}
        .remaining=${incompleted.length}
      ></todo-footer>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>Written by <a href="https://djalmajr.com">Djalma Jr.</a></p>
      <p>Not part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
  `;
}
