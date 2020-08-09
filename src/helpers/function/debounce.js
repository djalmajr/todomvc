import { curryN } from "./curryN";

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
