import { createContext } from "preact";
import { useContext } from "preact/hooks";
import { createCache, reduceState } from "../utils";

const todoCache = createCache("app-todos");

const actions = {
  add(state, payload) {
    const uid = new Date().toJSON().replace(/[^\w]/g, "");

    return {
      ...state,
      [uid]: {
        uid,
        completed: false,
        text: payload.text,
      },
    };
  },
  clear(state) {
    return reduceState((res, uid) =>
      state[uid].completed ? res : { ...res, [uid]: state[uid] }
    )(state);
  },
  edit(state, payload) {
    return reduceState((res, uid) => ({
      ...res,
      [uid]:
        payload.uid === uid
          ? { ...state[uid], text: payload.text }
          : state[uid],
    }))(state);
  },
  remove(state, payload) {
    return Object.keys(state)
      .filter((k) => k !== payload.uid)
      .reduce((res, uid) => ({ ...res, [uid]: state[uid] }), {});
  },
  toggle(state, payload) {
    return reduceState((res, uid) => ({
      ...res,
      [uid]:
        payload.uid === uid
          ? { ...state[uid], completed: !state[uid].completed }
          : state[uid],
    }))(state);
  },
  toggleAll(state) {
    const completed = Object.keys(state).every((uid) => state[uid].completed);

    return reduceState((res, uid) => ({
      ...res,
      [uid]: { ...state[uid], completed: !completed },
    }))(state);
  },
};

export function todoReducer(state, { type, payload = {} }) {
  const newState = (actions[type] || (() => state))(state, payload);

  todoCache.set(newState);

  return newState;
}

export const createTodoActions = (dispatch) => ({
  addTodo: (text) => dispatch({ type: "add", payload: { text } }),
  editTodo: (todo) => dispatch({ type: "edit", payload: todo }),
  removeTodo: (todo) => dispatch({ type: "remove", payload: todo }),
  toggleTodo: (todo) => dispatch({ type: "toggle", payload: todo }),
  toggleAllTodos: () => dispatch({ type: "toggleAll" }),
  clearCompletedTodos: () => dispatch({ type: "clear" }),
});

export const initTodoState = todoCache.get();

export const TodoContext = createContext();

export const withTodos = (child) => (props) => {
  return child({ ...props, ...useContext(TodoContext) });
};
