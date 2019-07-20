import { html } from "https://unpkg.com/lit-html?module";
import { repeat } from "https://unpkg.com/lit-html/directives/repeat.js?module";
import controller from "../controllers/todos.js";
import renderHeader from "./header.js";
import renderFooter from "./footer.js";
import renderTodo from "./todo.js";

addStyleSheet(__dirname + "/app.css");

export default () => html`
  <div class="todo-app">
    <section class="todo-app__content">
      ${renderHeader()}
      <section class="todo-app__todos">
        <ul>
          ${repeat(controller.filtered, t => t.uid, renderTodo)}
        </ul>
      </section>
      ${renderFooter()}
    </section>
    <footer class="todo-app__footer">
      <p>Double-click to edit a todo</p>
      <p>Written by <a href="https://djalmajr.com">Djalma Jr.</a></p>
      <p>Not (yet 😆) part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
  </div>
`;
