import curryN from "./curryN.js";
import set from "./set.js";

export default curryN(2, (attrs, obj) => {
  return [].concat(attrs).reduce((r, k) => set(k, obj[k], r), {});
});
