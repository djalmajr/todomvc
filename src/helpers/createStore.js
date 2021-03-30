const fns = Symbol("fns");

const val = Symbol("val");

export default function createStore(obj) {
  Object.assign(obj, {
    [fns]: [],
    [val]: {},
    subscribe(fn) {
      this[fns].push(fn);

      return () => {
        const idx = this[fns].findIndex((f) => f === fn);
        this[fns].splice(idx, 1);
      };
    },
  });

  return new Proxy(obj, {
    get(target, property) {
      var value = target[property];

      if (value instanceof Function) {
        return function (...args) {
          if (value === obj.subscribe) {
            return value.apply(target, args);
          }

          Object.assign(target, value.apply(target, [target, ...args]));
          target[fns].forEach((fn) => fn(target));
        };
      }

      return value;
    },
  });
}
