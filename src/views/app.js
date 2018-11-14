import Header from "./header.js";
import Footer from "./footer.js";
import Todos from "./todos.js";

const header = hyperHTML.wire();
const todos = hyperHTML.wire();
const footer = hyperHTML.wire();

export default (html, controller) => {
  return html`
    <div class="app-container">
      <section class="app-content">
        ${Header(header, controller)}
        ${Todos(todos, controller)}
        ${Footer(footer, controller)}
      </section>
      <footer class="app-info">
        <p>Double-click to edit a todo</p>
        <p>Written by <a href="https://djalmajr.com">Djalma Jr.</a></p>
        <p>Not (yet 😆) part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    </div>
  `;
};
