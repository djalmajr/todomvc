// http://documentcloud.github.io/underscore-contrib/#snapshot
export function deepClone(data) {
  if (data === null || typeof data !== "object") {
    return data;
  }

  const res = new data.constructor();

  for (const key in data) {
    // eslint-disable-next-line
    if (data.hasOwnProperty(key)) {
      res[key] = deepClone(data[key]);
    }
  }

  return res;
}
