import { debounce } from './function';

export const createCache = (key) => ({
  get: () => JSON.parse(localStorage.getItem(key) || '{}'),
  set: debounce(1000, (t) => localStorage.setItem(key, JSON.stringify(t))),
});
