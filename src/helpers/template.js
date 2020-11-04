import curry from "./curry.js";

export default curry((str, obj) => {
  return str.replace(/{{\s*?(.+?)\s*?}}/g, (_, k) => obj[k.trim()]);
  // return str.replace(/{(.+?)}/g, (_, k) => obj[k]);
});
