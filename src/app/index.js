import App from '~/containers/App';
import render from '~/helpers/render';
import store, { todoCache } from '~/store';

function renderApp() {
  render(document.querySelector('#root'), App());
}

store.subscribe(({ todos }) => {
  todoCache.set(todos);
  renderApp();
});

window.onhashchange = store.updateRoute;

renderApp();
