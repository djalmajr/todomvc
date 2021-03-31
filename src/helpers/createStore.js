import { isFn } from "./is.js";

const fns = Symbol("fns");

// const cached = Symbol("cached");

export default function createStore(source) {
  source[fns] = [];

  Object.keys(source).forEach((key) => {
    if (isFn(source[key])) {
      const fn = source[key];

      source[key] = function () {
        fn.apply(source, arguments);
        source[fns].forEach((f) => f(source));
      };
    }
  });

  source.subscribe = function (fn) {
    this[fns].push(fn);

    return () => {
      const idx = this[fns].findIndex((f) => f === fn);
      this[fns].splice(idx, 1);
    };
  };

  return source;

  // Object.assign(source, {
  //   [fns]: [],
  //   subscribe(fn) {
  //     this[fns].push(fn);

  //     return () => {
  //       const idx = this[fns].findIndex((f) => f === fn);
  //       this[fns].splice(idx, 1);
  //     };
  //   },
  // });

  // return new Proxy(source, {
  //   get(target, property) {
  //     if (property === cached) return true;

  //     const value = target[property];

  //     if (isFn(value) && value !== source.subscribe && !value[cached]) {
  //       target[property] = function () {
  //         value.apply(target, arguments);
  //         target[fns].forEach((fn) => fn(target));
  //       };

  //       target[property][cached] = true;
  //     }

  //     return target[property];
  //   },
  // });
}
