import curryN from "./curryN.js";
import str2path from "./str2path.js";
import deepClone from "./deepClone.js";

const isFn = (a) => typeof a === "function";

export default curryN(3, (str, val, data) => {
  const res = deepClone(data);

  const fn = (obj, [key, ...keys]) => {
    if (!keys.length) {
      obj[key] = isFn(val) ? val(deepClone(obj[key])) : val;
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
