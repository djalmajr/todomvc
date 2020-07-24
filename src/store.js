import { writable } from 'svelte/store';
import { filter, reduce } from './helpers/collection';
import { createCache } from './helpers/createCache';
import { curryN, flow } from './helpers/function';
import { set, values } from './helpers/object';

export const todoCache = createCache('app-todos');

export const getHash = () => {
  const str = (location.hash.match(/\w+/g) || [])[0];
  return str !== 'completed' && str !== 'active' ? 'all' : str;
};

export const filterTodos = curryN(2, (filter, todos) => {
  if (filter === 'all') {
    return values(todos);
  }

  return values(todos).filter(
    filter === 'active' ? (t) => !t.completed : (t) => t.completed
  );
});

function createTodos() {
  const { subscribe, update } = writable(todoCache.get());

  return {
    subscribe,
    add(text) {
      const uid = new Date().toJSON().replace(/[^\w]/g, '');
      const todo = { uid, text, completed: false };

      update(set(uid, todo));
    },
    clear() {
      update(
        flow(
          values,
          reduce((res, t) => (t.completed ? res : set(t.uid, t, res)), {})
        )
      );
    },
    edit({ uid, text }) {
      update(set(`${uid}.text`, text));
    },
    remove({ uid }) {
      update(
        flow(
          values,
          filter((t) => t.uid !== uid),
          reduce((res, todo) => set(todo.uid, todo, res), {})
        )
      );
    },
    toggle({ uid }) {
      update(set(`${uid}.completed`, (val) => !val));
    },
    toggleAll() {
      update(($todos) => {
        const completed = filterTodos(getHash(), $todos).every(
          (t) => t.completed
        );

        return values($todos).reduce((res, todo) => {
          return set(`${todo.uid}.completed`, !completed, res);
        }, $todos);
      });
    },
  };
}

export const hash = writable(getHash());
export const todos = createTodos();

window.onhashchange = () => hash.set(getHash());
