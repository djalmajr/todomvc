import { curryN } from './curryN';

const { keys, values } = Object;

const compare = curryN(3, function (
  method: string,
  defaults: unknown,
  filter: any,
  arr: any
) {
  let result;

  if (typeof filter === 'function') {
    result = arr[method](filter);
  } else if (Array.isArray(filter)) {
    result = arr[method]((a: any) => a[filter[0]] === filter[1]);
  } else if (typeof filter === 'object') {
    result = arr[method]((a: any) => a[keys(filter)[0]] === values(filter)[0]);
  }

  return typeof result === 'undefined' ? defaults : result;
});

export const find = curryN(2, compare('find', undefined));
export const filter = curryN(2, compare('filter', undefined));
export const findIndex = curryN(2, compare('findIndex', -1));
