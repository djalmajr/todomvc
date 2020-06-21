import { curryN } from './curryN';
import { Obj } from '../types';

export const template = curryN(2, (str: string, obj: Obj) => {
  return str.replace(/{{\s*?(.+?)\s*?}}/g, (_, k) => obj[k.trim()]);
  // return str.replace(/{(.+?)}/g, (_, k) => obj[k]);
});
