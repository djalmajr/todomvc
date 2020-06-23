import { curryN } from "./curryN.js";
import { deepClone } from "./deepClone.js";
import { str2path } from "./str2path.js";

export const set = curryN(3, (...args) => {
  const [data, val, str] = args.reverse();
  const res = deepClone(data);

  const fn = (obj, [key, ...keys]) => {
    if (!keys.length) {
      obj[key] = typeof val === "function" ? val(deepClone(obj[key])) : val;
      return;
    }

    if (!obj[key]) {
      obj[key] = keys[0].match(/^\d+$/g) ? [] : {};
    }

    fn(obj[key], keys);
  };

  fn(res, str2path(str));

  return res;
});
