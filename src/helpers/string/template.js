import { curryN } from "../function/curryN";

export const template = curryN(2, (str, obj) => {
  return str.replace(/{{\s*?(.+?)\s*?}}/g, (_, k) => obj[k.trim()]);
  // return str.replace(/{(.+?)}/g, (_, k) => obj[k]);
});
