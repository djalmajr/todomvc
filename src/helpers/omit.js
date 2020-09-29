import curryN from "./curryN.js";
import pick from "./pick.js";

export default curryN(2, (attrs, obj) => {
  const keys = Object.keys(obj).filter((k) => !attrs.includes(k));
  return pick(keys, obj);
});
