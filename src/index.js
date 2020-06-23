import {
  html,
  render,
  useEffect,
  useState,
  virtual,
} from "https://unpkg.com/haunted/haunted.js";
import { Route } from "./components/awc-router.js";
import { TodoApp } from "./components/todo-app.js";
import { TodoFooter } from "./components/todo-footer.js";
import { TodoHeader } from "./components/todo-header.js";
import { TodoItem } from "./components/todo-item.js";
import { RouterContext } from "./contexts/router.js";
import { todoCache, TodoContext, useTodos } from "./contexts/todos.js";
import { define } from "./helpers/dom.js";
import { getRouteProps, getSlug } from "./helpers/route.js";

define("todo-app", TodoApp);
define("todo-item", TodoItem);
define("todo-footer", TodoFooter);
define("todo-header", TodoHeader);
define("todo-provider", TodoContext.Provider, false);

define("awc-route", Route);
define("awc-router", RouterContext.Provider, false);

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
