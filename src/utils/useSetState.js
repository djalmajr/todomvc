import { useState } from "react";
import { get } from "./get";
import { set } from "./set";
import { curryN } from "./curryN";

const setProp = curryN(3, (setState, path, value) => {
  if (!path) {
    return setState(typeof value === "function" ? (s) => value(s) : value);
  }

  setState((s) =>
    set(path, typeof value === "function" ? value(get(path, s)) : value, s)
  );
});

export function useSetState(init) {
  const [state, fn] = useState(init);
  const setState = setProp(fn);
  return [state, setState];
}
