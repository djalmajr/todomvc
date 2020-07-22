import { html, render, virtual } from 'haunted';
import './components/ac-router.js';
import './containers/todo-app.js';
import './containers/todo-footer.js';
import './containers/todo-header.js';
import './containers/todo-item.js';
import './containers/todo-store.js';

const Root = virtual(function () {
  return html`
    <ac-router>
      <todo-store>
        <todo-app></todo-app>
      </todo-store>
    </ac-router>
  `;
});

render(Root(), document.querySelector('#root'));
