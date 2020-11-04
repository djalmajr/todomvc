import curry from "./curry.js";
import str2path from "./str2path.js";

export default curry((str, data) => {
  const fn = (obj, [key, ...keys]) => {
    if (!keys.length) return obj[key];
    if (!obj[key]) return undefined;
    return fn(obj[key], keys);
  };

  return fn(data, str2path(str));
});
