import { wire } from "hyperhtml";
import renderHeader from "./header";
import renderFooter from "./footer";
import renderTodo from "./todo";
import styles from "./app.less";

const header = wire();
const footer = wire();

export default (html, todos) => html`
  <div class=${styles.container}>
    <section class=${styles.content}>
      ${renderHeader(header, todos)}
      <section class=${styles.todos}>
        <ul>${todos.map(renderTodo)}</ul>
      </section>
      ${renderFooter(footer, todos)}
    </section>
    <footer class=${styles.info}>
			<p>Double-click to edit a todo</p>
			<p>Written by <a href="https://djalmajr.com">Djalma Jr.</a></p>
			<p>Not (yet 😆) part of <a href="http://todomvc.com">TodoMVC</a></p>
		</footer>
  </div>
`;
