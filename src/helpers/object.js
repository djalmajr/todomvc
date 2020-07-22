import { curryN } from './function';

export const { isArray } = Array;
export const { assign, freeze, keys, values } = Object;

export const isObject = (a) => typeof a === 'object';
export const isFunction = (a) => typeof a === 'function';
export const isUndefined = (a) => typeof a === 'undefined';

export function isEqual(a, b) {
  const aLen = keys(a || {}).length;
  const bLen = keys(b || {}).length;

  if (!aLen || !bLen || aLen !== bLen) {
    return false;
  }

  const compare = (k) => {
    if (isObject(a[k]) && isObject(a[k])) {
      return isEqual(a[k], b[k]);
    }

    return a[k] === b[k];
  };

  return keys(a).every(compare);
}

// http://documentcloud.github.io/underscore-contrib/#snapshot
export function deepClone(data) {
  if (data === null || !isObject(data)) {
    return data;
  }

  const res = new data.constructor();

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      res[key] = deepClone(data[key]);
    }
  }

  return res;
}

export const str2path = (str) => {
  const rx1 = /[.|\]|[]/g;
  const rx2 = /[^a-zA-Z0-9_.[\]]/g;

  return str.replace(rx2, '').split(rx1).filter(Boolean);
};

export const set = curryN(3, (...args) => {
  const [data, val, str] = args.reverse();
  const res = deepClone(data);

  const fn = (obj, [key, ...keys]) => {
    if (!keys.length) {
      obj[key] = isFunction(val) ? val(deepClone(obj[key])) : val;
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

function _get(...args) {
  const [data, str, val] = args.reverse();

  const fn = (obj, [key, ...keys]) => {
    if (!keys.length) return obj[key] || val;
    if (!obj[key]) return val;
    return fn(obj[key], keys);
  };

  return fn(data, str2path(str));
}

export const get = curryN(2, _get);

export const getOr = curryN(3, _get);
