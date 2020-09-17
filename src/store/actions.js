import { curryN, set } from "../helpers";
import { filterTodos } from "./selectors.js";

export const addTodo = curryN(2, (text, state) => {
  const uid = new Date().toJSON().replace(/[^\w]/g, "");
  const todo = { uid, text, completed: false };
  return set(`todos.${uid}`, todo, state);
});

export const clearCompletedTodos = (state) => {
  return Object.keys(state.todos).reduce(
    (res, uid) => {
      const todo = state.todos[uid];
      return todo.completed ? res : set(`todos.${uid}`, todo, res);
    },
    { ...state, todos: {} }
  );
};

export const editTodo = curryN(2, ({ uid, text }, state) => {
  return set(`todos.${uid}.text`, text, state);
});

export const removeTodo = curryN(2, ({ uid }, state) => {
  const reducer = (res, uid) => set(`todos.${uid}`, state.todos[uid], res);

  return Object.keys(state.todos)
    .filter((id) => id !== uid)
    .reduce(reducer, { ...state, todos: {} });
});

export const toggleTodo = curryN(2, ({ uid }, state) => {
  return set(`todos.${uid}.completed`, (val) => !val, state);
});

export const toggleAllTodos = curryN(2, (filter, state) => {
  const filtered = filterTodos(filter, state.todos);
  const completed = filtered.every((t) => t.completed);

  return Object.keys(state.todos).reduce((res, uid) => {
    return set(`todos.${uid}.completed`, !completed, res);
  }, state);
});
