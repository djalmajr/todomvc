export default function createCache(key, defaults) {
  return {
    get() {
      try {
        return JSON.parse(localStorage.getItem(key)) || defaults;
      } catch (err) {
        return defaults;
      }
    },
    set(data) {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (err) {}
    },
  };
}
