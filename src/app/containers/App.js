import html from '~/helpers/html';
import store, { filterTodos } from '~/store';
import Footer from './Footer';
import Header from './Header';
import Todo from './Todo';
import './App.css';

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