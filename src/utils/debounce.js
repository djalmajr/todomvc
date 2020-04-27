// https://davidwalsh.name/function-debounce
export function debounce(func, wait, immediate) {
  let timeout;

  return function (...args) {
    const context = this;
    const callNow = immediate && !timeout;

    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}
