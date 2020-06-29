import { createCache } from "../helpers/createCache.js";
import { createContext } from "../helpers/createContext.js";
import { set } from "../helpers/set.js";

const { keys } = Object;

export const todoCache = createCache("app-todos");

export const [TodoContext, useTodos] = createContext({
  initState: todoCache.get(),
  actions: (dispatch) => ({
    addTodo: (text) => dispatch({ type: "addTodo", payload: { text } }),
    editTodo: (todo) => dispatch({ type: "editTodo", payload: todo }),
    removeTodo: (uid) => dispatch({ type: "removeTodo", payload: { uid } }),
    toggleTodo: (uid) => dispatch({ type: "toggleTodo", payload: { uid } }),
    toggleAllTodos: () => dispatch({ type: "toggleAllTodos" }),
    clearCompletedTodos: () => dispatch({ type: "clearCompletedTodos" }),
  }),
  reducers: (state, payload) => ({
    addTodo() {
      const uid = new Date().toJSON().replace(/[^\w]/g, "");
      return set(uid, { uid, completed: false, text: payload.text }, state);
    },
    clearCompletedTodos() {
      return keys(state).reduce((res, uid) => {
        return state[uid].completed ? res : set(uid, state[uid], res);
      }, {});
    },
    editTodo() {
      return set(`${payload.uid}.text`, payload.text, state);
    },
    removeTodo() {
      return keys(state)
        .filter((uid) => uid !== payload.uid)
        .reduce((res, uid) => set(uid, state[uid], res), {});
    },
    toggleTodo() {
      return set(`${payload.uid}.completed`, (val) => !val, state);
    },
    toggleAllTodos() {
      const completed = keys(state).every((uid) => state[uid].completed);

      return keys(state).reduce((res, uid) => {
        return set(`${uid}.completed`, !completed, res);
      }, state);
    },
  }),
});

if (!customElements.get("todo-provider")) {
  customElements.define("todo-provider", TodoContext.Provider);
}
