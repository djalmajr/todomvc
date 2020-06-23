import { debounce } from "./debounce.js";

export const createCache = (key) => ({
  get: () => JSON.parse(localStorage.getItem(key) || "{}"),
  set: debounce(1000, (t) => localStorage.setItem(key, JSON.stringify(t))),
});
