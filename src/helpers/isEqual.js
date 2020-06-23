const { keys } = Object;

const isObj = (a) => typeof a === "object";

export function isEqual(a, b) {
  const aLen = keys(a || {}).length;
  const bLen = keys(b || {}).length;

  if (!aLen || !bLen || aLen !== bLen) {
    return false;
  }

  const compare = (k) => {
    if (isObj(a[k]) && isObj(a[k])) {
      return isEqual(a[k], b[k]);
    }

    return a[k] === b[k];
  };

  return keys(a).every(compare);
}
