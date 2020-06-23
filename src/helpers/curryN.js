/**
 * Curry a function by N arguments.
 *
 * @param  {...any} args
 *
 * @example
 *
 * const pow = (b, a) => Math.pow(a, b);
 * const toSquare = curryN(2);
 * console.log(toSquare(9)) // logs 81
 */
export function curryN(...args) {
  if (args.length < 2) {
    return curryN.bind(null, ...args);
  }

  const [size, callback] = args;

  const curried = function (...params) {
    return params.length < size
      ? curried.bind(null, ...params)
      : callback(...params);
  };

  return curried;
}
