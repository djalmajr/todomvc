import { createContext } from "preact";
import { useContext, useMemo, useReducer } from "preact/hooks";
import { createCache, reduceState } from "../utils";

const todoCache = createCache("app-todos");

const reducers = {
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

const reducer = (state, { type, payload = {} }) => {
  const newState = (reducers[type] || (() => state))(state, payload);

  todoCache.set(newState);

  return newState;
};

const createActions = (dispatch) => ({
  addTodo: (text) => dispatch({ type: "add", payload: { text } }),
  editTodo: (todo) => dispatch({ type: "edit", payload: todo }),
  removeTodo: (todo) => dispatch({ type: "remove", payload: todo }),
  toggleTodo: (todo) => dispatch({ type: "toggle", payload: todo }),
  toggleAllTodos: () => dispatch({ type: "toggleAll" }),
  clearCompletedTodos: () => dispatch({ type: "clear" }),
});

const initState = todoCache.get();

const Context = createContext(initState);

export const TodoProvider = Context.Provider;

export const useTodoReducer = () => {
  const [todos, dispatch] = useReducer(reducer, initState);
  const todoActions = useMemo(() => createActions(dispatch), []);

  return { todos, ...todoActions };
};

export const withTodos = (child) => (props) => {
  return child({ ...props, ...useContext(Context) });
};
