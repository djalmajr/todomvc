import deepClone from "./deepClone.js";

const { keys, defineProperty } = Object;

export default function createStore(init) {
  const callbacks = [];
  const state = {};

  const store = keys(init).reduce((res, key) => {
    if (typeof init[key] !== "function") {
      state[key] = init[key];
    }

    const obj = defineProperty(res, key, {
      enumerable: true,
      configurable: true,
      get() {
        return state[key];
      },
      set(value) {
        state[key] = value;
        callbacks.forEach((cb) => cb(deepClone(state)));
      },
    });

    if (typeof init[key] === "function") {
      obj[key] = init[key].bind(obj);
    }

    return obj;
  }, {});

  store.subscribe = (callback) => {
    callbacks.push(callback);

    return () => {
      const idx = callbacks.findIndex((cb) => cb === callback);

      callbacks.splice(idx, 1);
    };
  };

  return store;
}
