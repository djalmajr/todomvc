import { curryN } from "./curryN.js";

const { keys, values } = Object;

const compare = curryN(4, function (method, defaults, filter, arr) {
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

export const find = compare("find", undefined);
export const filter = compare("filter", undefined);
export const findIndex = compare("findIndex", -1);
