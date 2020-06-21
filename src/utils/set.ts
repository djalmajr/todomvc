import { Obj } from '../types';
import { curryN } from './curryN';
import { deepClone } from './deepClone';
import { str2path } from './str2path';

export const set = curryN(3, (...args: unknown[]) => {
  const [data, val, str] = args.reverse() as [Obj, unknown, string];
  const res = deepClone(data);

  const fn = (obj: Obj, [key, ...keys]: string[]) => {
    if (!keys.length) {
      obj[key] = typeof val === 'function' ? val(deepClone(obj[key])) : val;
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
