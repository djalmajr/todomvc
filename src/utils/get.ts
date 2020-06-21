import { Obj } from '../types';
import { curryN } from './curryN';
import { str2path } from './str2path';

function _get(...args: unknown[]) {
  const [data, str, val] = args.reverse() as [Obj, string, unknown];

  const fn = (obj: Obj, [key, ...keys]: string[]): unknown => {
    if (!keys.length) return obj[key] || val;
    if (!obj[key]) return val;
    return fn(obj[key], keys);
  };

  return fn(data, str2path(str));
}

export const get = curryN(2, _get);
export const getOr = curryN(3, _get);
