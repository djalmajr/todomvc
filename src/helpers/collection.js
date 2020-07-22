import { curryN } from './function';
import {
  isArray,
  isFunction,
  isObject,
  isUndefined,
  keys,
  values,
} from './object';

const compare = curryN(4, function (method, defaults, filter, arr) {
  let result;

  if (isFunction(filter)) {
    result = arr[method](filter);
  } else if (isArray(filter)) {
    result = arr[method]((arr) => arr[filter[0]] === filter[1]);
  } else if (isObject(filter)) {
    result = arr[method]((arr) => arr[keys(filter)[0]] === values(filter)[0]);
  }

  return isUndefined(result) ? defaults : result;
});

export const find = compare('find', undefined);

export const filter = compare('filter', undefined);

export const findIndex = compare('findIndex', -1);
