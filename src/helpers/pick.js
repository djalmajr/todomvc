import curry from "./curry.js";
import set from "./set.js";

export default curry((attrs, obj) => {
  return [].concat(attrs).reduce((r, k) => set(k, obj[k], r), {});
});
