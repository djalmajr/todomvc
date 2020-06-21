import { html, render, useState, virtual } from 'haunted';
import { getSlug, RouterContext } from './components/x-router';
import { TodoContext, useTodos } from './contexts';
import './components';

customElements.define('todo-provider', TodoContext.Provider as any);
customElements.define('x-router', RouterContext.Provider as any);

const Root = virtual(() => {
  const [todoState, todoActions] = useTodos();
  const [slug, setSlug] = useState(getSlug());

  window.onhashchange = () => setSlug(getSlug());

  return html`
    <todo-provider .value=${{ ...todoState, ...todoActions }}>
      <x-router .value=${slug}>
        <todo-app></todo-app>
      </x-router>
    </todo-provider>
  `;
});

render(Root(), document.querySelector('#root')!);
