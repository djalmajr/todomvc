import { curryN } from "../function/curryN";
import { str2path } from "../string/str2path";

export const get = curryN(2, (str, data) => {
  const fn = (obj, [key, ...keys]) => {
    if (!keys.length) return obj[key];
    if (!obj[key]) return undefined;
    return fn(obj[key], keys);
  };

  return fn(data, str2path(str));
});
