const isObject = (a) => typeof a === "object";

export function isEqual(a, b) {
  const aLen = Object.keys(a || {}).length;
  const bLen = Object.keys(b || {}).length;

  if (!aLen || !bLen || aLen !== bLen) {
    return false;
  }

  const compare = (k) => {
    if (isObject(a[k]) && isObject(a[k])) {
      return isEqual(a[k], b[k]);
    }

    return a[k] === b[k];
  };

  return Object.keys(a).every(compare);
}
