import { curryN } from "../function/curryN";

const { keys, values } = Object;

export const baseFind = curryN(4, (method, defaults, filter, arr) => {
  let result;

  if (typeof filter === "function") {
    result = arr[method](filter);
  } else if (Array.isArray(filter)) {
    result = arr[method]((arr) => arr[filter[0]] === filter[1]);
  } else if (typeof filter === "object") {
    result = arr[method]((arr) => arr[keys(filter)[0]] === values(filter)[0]);
  }

  return typeof result === "undefined" ? defaults : result;
});
