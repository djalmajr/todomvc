import curry from "./curry.js";
import pick from "./pick.js";

export default curry((attrs, obj) => {
  const keys = Object.keys(obj).filter((k) => !attrs.includes(k));
  return pick(keys, obj);
});
