import { createContext, createCache, set } from "../utils";

const todoCache = createCache("app-todos");

export const [TodosProvider, useTodos, withTodos] = createContext({
  initState: todoCache.get(),
  actions: (dispatch) => ({
    addTodo: (text) => dispatch({ type: "addTodo", payload: { text } }),
    editTodo: (todo) => dispatch({ type: "editTodo", payload: todo }),
    removeTodo: (todo) => dispatch({ type: "removeTodo", payload: todo }),
    toggleTodo: (todo) => dispatch({ type: "toggleTodo", payload: todo }),
    toggleAllTodos: () => dispatch({ type: "toggleAllTodos" }),
    clearCompletedTodos: () => dispatch({ type: "clearCompletedTodos" }),
  }),
  reducers: (state, payload) => ({
    addTodo() {
      const uid = new Date().toJSON().replace(/[^\w]/g, "");
      return set(uid, { uid, completed: false, text: payload.text }, state);
    },
    clearCompletedTodos() {
      return Object.keys(state).reduce((res, uid) => {
        return state[uid].completed ? res : set(uid, state[uid], res);
      }, {});
    },
    editTodo() {
      return set(`${payload.uid}.text`, payload.text, state);
    },
    removeTodo() {
      return Object.keys(state)
        .filter((k) => k !== payload.uid)
        .reduce((res, uid) => set(uid, state[uid], res), {});
    },
    toggleTodo() {
      return set(`${payload.uid}.completed`, (val) => !val, state);
    },
    toggleAllTodos() {
      const completed = Object.keys(state).every((uid) => state[uid].completed);

      return Object.keys(state).reduce((res, uid) => {
        return set(`${uid}.completed`, !completed, res);
      }, state);
    },
  }),
});
