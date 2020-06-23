export const flow = (...args) => {
  const apply = (val, fn, fns) => {
    if (fns.length) {
      return apply(fn(val), fns[0], fns.slice(1));
    }

    return fn(val);
  };

  return (value) => apply(value, args[0], args.slice(1));
};
