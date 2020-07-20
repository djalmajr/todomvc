import {
  component,
  html,
  useContext,
  useEffect,
} from "https://unpkg.com/haunted/haunted.js";
import { getSlug } from "../components/ac-router.js";
import { curryN } from "../helpers/function.js";
import { freeze, keys, set, values } from "../helpers/object.js";
import { createCache, createContext } from "../helpers/utils.js";

const todoCache = createCache("app-todos");

const empty = freeze({ todos: {} });

export const filterTodos = curryN(2, (filter, todos) => {
  if (filter === "/") {
    return values(todos);
  }

  return values(todos).filter(
    filter === "/active" ? (t) => !t.completed : (t) => t.completed
  );
});

const [Context, useStore] = createContext({
  initState: {
    todos: todoCache.get(),
  },
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
      const todo = { uid, completed: false, text: payload.text };
      return set(`todos.${uid}`, todo, state);
    },
    clearCompletedTodos() {
      return keys(state.todos).reduce((res, uid) => {
        const todo = state.todos[uid];
        return todo.completed ? res : set(`todos.${uid}`, todo, res);
      }, empty);
    },
    editTodo() {
      return set(`todos.${payload.uid}.text`, payload.text, state);
    },
    removeTodo() {
      const { todos } = state;
      return keys(todos)
        .filter((uid) => uid !== payload.uid)
        .reduce((res, uid) => set(`todos.${uid}`, todos[uid], res), empty);
    },
    toggleTodo() {
      return set(`todos.${payload.uid}.completed`, (val) => !val, state);
    },
    toggleAllTodos() {
      const filtered = filterTodos(getSlug(), state.todos);
      const completed = filtered.every((t) => t.completed);
      return keys(state.todos).reduce((res, uid) => {
        return set(`todos.${uid}.completed`, !completed, res);
      }, state);
    },
  }),
});

export const useTodos = () => useContext(Context);

function Store({ render }) {
  const [state, actions] = useStore();

  useEffect(() => todoCache.set(state.todos), [state.todos]);

  return html`
    <todo-provider .value=${{ ...state, ...actions }}>
      ${render
        ? html`<todo-consumer .render=${render}></todo-consumer>`
        : html`<slot></slot>`}
    </todo-provider>
  `;
}

if (!customElements.get("todo-provider")) {
  customElements.define("todo-consumer", Context.Consumer);
  customElements.define("todo-provider", Context.Provider);
}

if (!customElements.get("todo-store")) {
  customElements.define("todo-store", component(Store));
}
