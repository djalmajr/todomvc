import debounce from "./debounce.js";

export default function createCache(key) {
  return {
    get: () => JSON.parse(localStorage.getItem(key) || "{}"),
    set: debounce(1000, (t) => localStorage.setItem(key, JSON.stringify(t))),
  };
}
