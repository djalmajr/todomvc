import App from "./containers/App.js";
import render from "./helpers/render.js";
import store, { todoCache } from "./store.js";

function renderApp() {
  render(document.querySelector("#root"), App());
}

store.subscribe(function ({ todos }) {
  todoCache.set(todos);
  renderApp();
});

window.onhashchange = store.updateHash;

renderApp();
