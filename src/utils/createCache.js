import { debounce } from "./debounce";

export const createCache = (key) => ({
  get: () => JSON.parse(localStorage.getItem(key) || "{}"),
  set: debounce((t) => localStorage.setItem(key, JSON.stringify(t)), 1000),
});
