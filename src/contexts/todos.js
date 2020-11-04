import createCache from "../helpers/createCache";
import createContext from "../helpers/createContext";
import curry from "../helpers/curry";
import set from "../helpers/set";

export const todoCache = createCache("app-todos");

export const getHash = () => {
  const str = (window.location.hash.match(/\w+/g) || [])[0];
  return str !== "completed" && str !== "active" ? "all" : str;
};

export const filterTodos = curry((filter, todos) => {
  if (filter === "all") {
    return Object.values(todos);
  }

  return Object.values(todos).filter(
    filter === "active" ? (t) => t.completed : (t) => !t.completed
  );
});

export const [TodoProvider, useTodos, withTodos] = createContext({
  initState: {
    hash: getHash(),
    todos: todoCache.get(),
  },
  actions: (dispatch) => ({
    updateHash: () => dispatch({ type: "updateHash" }),
    addTodo: (text) => dispatch({ type: "addTodo", payload: { text } }),
    editTodo: (todo) => dispatch({ type: "editTodo", payload: todo }),
    removeTodo: (todo) => dispatch({ type: "removeTodo", payload: todo }),
    toggleTodo: (todo) => dispatch({ type: "toggleTodo", payload: todo }),
    toggleAllTodos: () => dispatch({ type: "toggleAllTodos" }),
    clearCompletedTodos: () => dispatch({ type: "clearCompletedTodos" }),
  }),
  reducers: (state, payload) => ({
    updateHash() {
      return set("hash", getHash(), state);
    },
    addTodo() {
      const uid = new Date().toJSON().replace(/[^\w]/g, "");
      const todo = { uid, completed: false, text: payload.text };
      return set(`todos.${uid}`, todo, state);
    },
    clearCompletedTodos() {
      return Object.keys(state.todos).reduce((res, uid) => {
        const todo = state.todos[uid];
        return todo.completed ? res : set(`todos.${uid}`, todo, res);
      }, Object.assign({}, state, { todos: {} }));
    },
    editTodo() {
      return set(`todos.${payload.uid}.text`, payload.text, state);
    },
    removeTodo() {
      return Object.keys(state.todos)
        .filter((uid) => uid !== payload.uid)
        .reduce(
          (res, uid) => set(`todos.${uid}`, state.todos[uid], res),
          Object.assign({}, state, { todos: {} })
        );
    },
    toggleTodo() {
      return set(`todos.${payload.uid}.completed`, (val) => !val, state);
    },
    toggleAllTodos() {
      const filtered = filterTodos(state.hash, state.todos);
      const completed = filtered.every((t) => t.completed);
      return Object.keys(state.todos).reduce((res, uid) => {
        return set(`todos.${uid}.completed`, !completed, res);
      }, state);
    },
  }),
});
