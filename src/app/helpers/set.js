import curry from "./curry";

// https://github.com/fwilkerson/clean-set

function copy(src) {
  let to = src && !!src.pop ? [] : {};
  for (let i in src) to[i] = src[i];
  return to;
}

export default curry((arr, val, src) => {
  arr.split && (arr = arr.split("."));

  let next = copy(src), last = next;

  for (let i = 0, l = arr.length; i < l; i++) {
    last = last[arr[i]] = i === l - 1
      ? (val && !!val.call ? val(last[arr[i]]) : val)
      : copy(last[arr[i]]);
  }

  return next;
});
