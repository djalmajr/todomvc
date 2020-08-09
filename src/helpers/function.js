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

// https://davidwalsh.name/function-debounce
export const debounce = curryN(2, (wait, func) => {
  let timeout;

  return function (...args) {
    const context = this;
    const later = function () {
      timeout = undefined;
      func.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (!timeout) func.apply(context, args);
  };
});

export const flow = (...fns) => (x) => fns.reduce((y, f) => f(y), x);
