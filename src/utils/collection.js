import { curryN } from "./curryN";

const { keys, values } = Object;

const compare = curryN(3, (method, filter, arr) =>
  arr[method]((a) => a[keys(filter)[0]] === values(filter)[0])
);

export const find = curryN(2, compare("find"));
export const filter = curryN(2, compare("filter"));
export const findIndex = curryN(2, compare("findIndex"));

export const flow = (...args) => {
  const apply = (val, fn, fns) => {
    if (fns.length) {
      return apply(fn(val), fns[0], fns.slice(1));
    }

    return fn(val);
  };

  return (value) => apply(value, args[0], args.slice(1));
};
