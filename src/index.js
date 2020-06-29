import {
  html,
  render,
  useEffect,
  virtual,
} from "https://unpkg.com/haunted/haunted.js";
import { todoCache, useTodos } from "./contexts/todos.js";
import "./components/ac-router.js";
import "./components/todo-app.js";
import "./components/todo-footer.js";
import "./components/todo-header.js";
import "./components/todo-item.js";

const Root = virtual(function () {
  const [todoState, todoActions] = useTodos();

  useEffect(() => todoCache.set(todoState), [todoState]);

  return html`
    <todo-provider .value=${{ todos: todoState, ...todoActions }}>
      <ac-router>
        <todo-app></todo-app>
      </ac-router>
    </todo-provider>
  `;
});

render(Root(), document.querySelector("#root"));
