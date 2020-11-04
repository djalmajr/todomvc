import curry from "./curry.js";

// https://davidwalsh.name/function-debounce
export default curry((wait, func) => {
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
