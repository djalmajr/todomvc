import {
  html,
  render,
  useEffect,
  useState,
  virtual,
} from "https://unpkg.com/haunted/haunted.js";
import { todoCache, useTodos } from "./contexts/todos.js";
import { getRouteProps, getSlug } from "./helpers/route.js";
import "./components.js";

const Root = virtual(function () {
  const [todoState, todoActions] = useTodos();
  const [route, setRoute] = useState({ slug: getSlug() });

  window.onhashchange = () => setRoute(getRouteProps());
  useEffect(() => setTimeout(() => setRoute(getRouteProps())), []);
  useEffect(() => todoCache.set(todoState), [todoState]);

  return html`
    <todo-provider .value=${{ todos: todoState, ...todoActions }}>
      <awc-router .value=${route}>
        <todo-app></todo-app>
      </awc-router>
    </todo-provider>
  `;
});

render(Root(), document.querySelector("#root"));
