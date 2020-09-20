import { curryN, set } from "./helpers";

export const filterTodos = curryN(2, (filter, todos) => {
  if (filter === "all") {
    return Object.values(todos);
  }

  return Object.values(todos).filter(
    filter === "active" ? (t) => !t.completed : (t) => t.completed
  );
});

export const ActionTypes = {
  ADD: "todos:add",
  EDIT: "todos:edit",
  CLEAR: "todos:clear-completed",
  REMOVE: "todos:remove",
  TOGGLE: "todos:toggle",
  TOGGLE_ALL: "todos:toggle-all",
};

export const actions = {
  [ActionTypes.ADD]: curryN(2, (text, state) => {
    const uid = new Date().toJSON().replace(/[^\w]/g, "");
    const todo = { uid, text, completed: false };
    return set(`todos.${uid}`, todo, state);
  }),
  [ActionTypes.EDIT]: curryN(2, ({ uid, text }, state) => {
    return set(`todos.${uid}.text`, text, state);
  }),
  [ActionTypes.REMOVE]: curryN(2, ({ uid }, state) => {
    const reducer = (res, uid) => set(`todos.${uid}`, state.todos[uid], res);

    return Object.keys(state.todos)
      .filter((id) => id !== uid)
      .reduce(reducer, { ...state, todos: {} });
  }),
  [ActionTypes.CLEAR]: (state) => {
    return Object.keys(state.todos).reduce(
      (res, uid) => {
        const todo = state.todos[uid];
        return todo.completed ? res : set(`todos.${uid}`, todo, res);
      },
      { ...state, todos: {} }
    );
  },
  [ActionTypes.TOGGLE]: curryN(2, ({ uid }, state) => {
    return set(`todos.${uid}.completed`, (val) => !val, state);
  }),
  [ActionTypes.TOGGLE_ALL]: curryN(2, (filter, state) => {
    const filtered = filterTodos(filter, state.todos);
    const completed = filtered.every((t) => t.completed);

    return Object.keys(state.todos).reduce((res, uid) => {
      return set(`todos.${uid}.completed`, !completed, res);
    }, state);
  }),
};
