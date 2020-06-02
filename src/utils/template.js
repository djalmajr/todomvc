import { curryN } from "./curryN";

const tpl = (str, obj) => {
  // return str.replace(/{{\s*?(.+?)\s*?}}/g, (_, k) => obj[k.trim()]);
  return str.replace(/{(.+?)}/g, (_, k) => obj[k]);
};

if (!String.prototype.tpl) {
  // eslint-disable-next-line
  String.prototype.tpl = function (obj) {
    return tpl(this, obj);
  };
}

export const template = curryN(2, tpl);
