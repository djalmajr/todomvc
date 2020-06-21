import { debounce } from './debounce';

export const createCache = (key: string) => ({
  get: () => JSON.parse(localStorage.getItem(key) || '{}'),
  set: debounce(
    (t: string) => localStorage.setItem(key, JSON.stringify(t)),
    1000
  ),
});
