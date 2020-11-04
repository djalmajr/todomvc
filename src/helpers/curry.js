/**
 * Curry a function by N arguments.
 *
 * @param  {...any} args
 *
 * @example
 *
 * const pow = curry((b, a) => Math.pow(a, b));
 * const toSquare = pow(2);
 * console.log(toSquare(9)) // logs 81
 */
export default function curry(callback) {
  return function _curry(...args) {
    return args.length < callback.length
      ? _curry.bind(null, ...args)
      : callback(...args);
  };
}
