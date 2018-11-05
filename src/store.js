import { action, autorun, observable, toJS } from "mobx";

const CACHE_KEY = "app-todos";

const store = observable({
  filter: "all",

  todos: JSON.parse(localStorage.getItem(CACHE_KEY) || "{}"),

  get allDone() {
    return this.filteredTodos.every(t => t.completed);
  },

  get incompletedTodos() {
    const todos = Object.values(this.todos);
    return todos.filter(t => !t.completed);
  },

  get activeTodos() {
    const todos = Object.values(this.todos);
    return todos.filter(t => t.completed);
  },

  get filteredTodos() {
    const todos = Object.values(this.todos);

    switch (this.filter) {
      case "active":
        return todos.filter(t => !t.completed);
      case "completed":
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  },

  get remaining() {
    return this.incompletedTodos.length > 1 ? "items left" : "item left";
  },

  get showToggle() {
    return !!this.filteredTodos.length;
  },

  setFilter: action(function(filter) {
    this.filter = filter;
  }),

  addTodo: action(function(text) {
    const id = new Date().toJSON().replace(".", ":");
    this.todos[id] = { id, text, completed: false };
  }),

  clearCompleted: action(function() {
    for (let id in this.todos) {
      if (this.todos[id].completed) {
        delete this.todos[id];
      }
    }
  }),

  removeTodo: action(function(todo) {
    delete this.todos[todo.id];
  }),

  toggleTodo: action(function(todo) {
    this.todos[todo.id].completed = !todo.completed;
  }),

  toggleAllTodos: action(function() {
    const completed = !this.allDone;

    for (let id in this.todos) {
      this.todos[id].completed = completed;
    }
  }),

  updateTodo: action(function(todo) {
    this.todos[todo.id] = todo;
  }),
});

// https://davidwalsh.name/function-debounce
function debounce(func, wait, immediate) {
  let timeout;

  return function(...args) {
    const context = this;
    const callNow = immediate && !timeout;

    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

const saveState = debounce(todos => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(todos));
}, 1000);

autorun(() => saveState(toJS(store.todos)));

export default store;
