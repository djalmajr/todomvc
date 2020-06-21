export const flow = (...args: Function[]) => {
  const apply = (val: unknown, fn: Function, fns: Function[]): unknown => {
    if (fns.length) {
      return apply(fn(val), fns[0], fns.slice(1));
    }

    return fn(val);
  };

  return (value: unknown) => apply(value, args[0], args.slice(1));
};
