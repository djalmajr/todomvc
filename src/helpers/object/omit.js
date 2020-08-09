import { curryN } from "../function/curryN";
import { pick } from "./pick";

export const omit = curryN(2, (attrs, obj) => {
  const keys = Object.keys(obj).filter((k) => !attrs.includes(k));
  return pick(keys, obj);
});
