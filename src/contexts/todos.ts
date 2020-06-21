import { createCache, createContext, set } from '../utils';

const todoCache = createCache('app-todos');

export type Todo = {
  uid: string;
  text: string;
  completed: boolean;
};

export type TodoState = {
  todos: Record<Todo['uid'], Todo>;
};

export type TodoActions = {
  addTodo(text: string): void;
  editTodo(todo: Todo): void;
  removeTodo(uid: Todo['uid']): void;
  toggleTodo(uid: Todo['uid']): void;
  toggleAllTodos(): void;
  clearCompletedTodos(): void;
};

export type TodoActionType = keyof TodoActions;

export const [TodoContext, useTodos] = createContext<
  TodoState,
  TodoActions,
  TodoActionType
>({
  initState: { todos: todoCache.get() },
  actions: (dispatch) => ({
    addTodo: (text) => dispatch({ type: 'addTodo', payload: { text } }),
    editTodo: (todo) => dispatch({ type: 'editTodo', payload: todo }),
    removeTodo: (uid) => dispatch({ type: 'removeTodo', payload: { uid } }),
    toggleTodo: (uid) => dispatch({ type: 'toggleTodo', payload: { uid } }),
    toggleAllTodos: () => dispatch({ type: 'toggleAllTodos' }),
    clearCompletedTodos: () => dispatch({ type: 'clearCompletedTodos' }),
  }),
  reducers: (state, payload) => ({
    addTodo() {
      const uid = new Date().toJSON().replace(/[^\w]/g, '');
      const todo = { uid, completed: false, text: payload.text };
      return set(`todos.${uid}`, todo, state);
    },
    clearCompletedTodos() {
      return Object.keys(state.todos).reduce(function (res, uid) {
        const todo = state.todos[uid];
        return todo.completed ? res : set(`todos.${uid}`, todo, res);
      }, {} as TodoState);
    },
    editTodo() {
      return set(`todos.${payload.uid}.text`, payload.text, state);
    },
    removeTodo() {
      return Object.keys(state.todos)
        .filter((uid) => uid !== payload.uid)
        .reduce(
          (res, uid) => set(`todos.${uid}`, state.todos[uid], res),
          {} as TodoState
        );
    },
    toggleTodo() {
      return set(
        `todos.${payload.uid}.completed`,
        (val: boolean) => !val
      )(state);
    },
    toggleAllTodos() {
      const completed = Object.keys(state.todos).every(
        (uid) => state.todos[uid].completed
      );

      return Object.keys(state.todos).reduce(function (res, uid) {
        return set(`todos.${uid}.completed`, !completed, res);
      }, state);
    },
  }),
});
