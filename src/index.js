import { html, render, virtual } from 'haunted';
import './components';
import './containers';

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
