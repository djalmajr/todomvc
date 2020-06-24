import { Route } from "./components/awc-router.js";
import { TodoApp } from "./components/todo-app.js";
import { TodoFooter } from "./components/todo-footer.js";
import { TodoHeader } from "./components/todo-header.js";
import { TodoItem } from "./components/todo-item.js";
import { RouterContext } from "./contexts/router.js";
import { TodoContext } from "./contexts/todos.js";
import { define } from "./helpers/dom.js";

define("todo-app", TodoApp);
define("todo-item", TodoItem);
define("todo-footer", TodoFooter);
define("todo-header", TodoHeader);
define("todo-provider", TodoContext.Provider, false);

define("awc-route", Route);
define("awc-router", RouterContext.Provider, false);
