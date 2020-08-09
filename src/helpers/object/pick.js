import { curryN } from "../function/curryN";
import { set } from "./set";

export const pick = curryN(2, (attrs, obj) => {
  return [].concat(attrs).reduce((r, k) => set(k, obj[k], r), {});
});
