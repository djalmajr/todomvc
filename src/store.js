import createCache from "./helpers/createCache.js";
import createStore from "./helpers/createStore.js";
import curry from "./helpers/curry.js";
import set from "./helpers/set.js";

const { values } = Object;

export const todoCache = createCache("app-todos", {});

export const getHash = () => {
  const str = (window.location.hash.match(/\w+/g) || [])[0];
  return str !== "completed" && str !== "active" ? "all" : str;
};

export const filterTodos = curry((filter, todos) => {
  if (filter === "all") {
    return values(todos);
  }

  return values(todos).filter(filter === "active" ? (t) => !t.completed : (t) => t.completed);
});

const store = createStore({
  hash: getHash(),
  todos: todoCache.get(),
  updateHash() {
    return { hash: getHash() };
  },
  addTodo(_state, text) {
    const uid = new Date().toJSON().replace(/[^\w]/g, "");
    const todo = { uid, text, completed: false };

    return {
      todos: set(uid, todo, this.todos),
    };
  },
  clearCompletedTodos({ todos }) {
    return {
      todos: values(todos).reduce((res, todo) => {
        return todo.completed ? res : set(todo.uid, todo, res);
      }, {}),
    };
  },
  editTodo({ todos }, todo, text) {
    return {
      todos: set(`${todo.uid}.text`, text, todos),
    };
  },
  removeTodo({ todos }, { uid }) {
    return {
      todos: values(todos)
        .filter((todo) => todo.uid !== uid)
        .reduce((res, todo) => set(todo.uid, todo, res), {}),
    };
  },
  toggleTodo({ todos }, todo) {
    return {
      todos: set(`${todo.uid}.completed`, (val) => !val, todos),
    };
  },
  toggleAllTodos({ hash, todos }) {
    const filtered = filterTodos(hash, todos);
    const completed = filtered.every((t) => t.completed);

    return {
      todos: values(todos).reduce((res, todo) => {
        return set(`${todo.uid}.completed`, !completed, res);
      }, todos),
    };
  },
});

export default store;
