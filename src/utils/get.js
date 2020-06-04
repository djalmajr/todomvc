import { str2path } from "./str2path";
import { curryN } from "./curryN";

function _get(...args) {
  const [data, str, val] = args.reverse();

  const fn = (obj, [key, ...keys]) => {
    if (!keys.length) return obj[key] || val;
    if (!obj[key]) return val;
    return fn(obj[key], keys);
  };

  return fn(data, str2path(str));
}

export const get = curryN(2, _get);
export const getOr = curryN(3, _get);
