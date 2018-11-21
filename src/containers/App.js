import Header from "./Header.js";
import Footer from "./Footer.js";
import Todo from "./Todo.js";

const header = hyperHTML.wire();
const footer = hyperHTML.wire();

export default (render, props) => {
  return render`
    <div class="app-container">
      <section class="app-content">
        ${Header(header, props)}
        <section class="app-todos">
          <ul>${props.filtered.map(todo => Todo(todo, props))}</ul>
        </section>
        ${Footer(footer, props)}
      </section>
      <footer class="app-info">
        <p>Double-click to edit a todo</p>
        <p>Written by <a href="https://djalmajr.com">Djalma Jr.</a></p>
        <p>Not (yet 😆) part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    </div>
  `;
};
