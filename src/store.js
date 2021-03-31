import createCache from "./helpers/createCache.js";
import createStore from "./helpers/createStore.js";
import curry from "./helpers/curry.js";
import set from "./helpers/set.js";

const { values } = Object;

export const todoCache = createCache("app-todos", {});

export const getRoute = () => ({
  pathname: window.location.hash.slice(1) || "/all",
});

export const filterTodos = curry((pathname, todos) => {
  if (pathname === "/all") {
    return values(todos);
  }

  return values(todos).filter(
    pathname === "/active" ? (t) => !t.completed : (t) => t.completed
  );
});

const store = createStore({
  route: getRoute(),
  todos: todoCache.get(),
  updateRoute() {
    this.route = getRoute();
  },
  addTodo(text) {
    const uid = new Date().toJSON().replace(/[^\w]/g, "");
    const todo = { uid, text, completed: false };

    this.todos = set(uid, todo, this.todos);
  },
  clearCompletedTodos() {
    this.todos = values(this.todos).reduce((res, todo) => {
      return todo.completed ? res : set(todo.uid, todo, res);
    }, {});
  },
  editTodo(todo, text) {
    this.todos = set(`${todo.uid}.text`, text, this.todos);
  },
  removeTodo({ uid }) {
    this.todos = values(this.todos)
      .filter((todo) => todo.uid !== uid)
      .reduce((res, todo) => set(todo.uid, todo, res), {});
  },
  toggleTodo(todo) {
    this.todos = set(`${todo.uid}.completed`, (val) => !val, this.todos);
  },
  toggleAllTodos() {
    const filtered = filterTodos(this.route.pathname, this.todos);
    const completed = filtered.every((t) => t.completed);

    this.todos = values(this.todos).reduce((res, todo) => {
      return set(`${todo.uid}.completed`, !completed, res);
    }, this.todos);
  },
});

export default store;
