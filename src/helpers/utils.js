import {
  createContext,
  useMemo,
  useReducer,
} from "https://unpkg.com/haunted/haunted.js";
import { debounce } from "./function.js";

function create({ initState, reducers, actions: createActions }) {
  const Context = createContext(initState);

  function reduce(state, action) {
    return reducers(state, action.payload)[action.type]();
  }

  function useRedux() {
    const [state, dispatch] = useReducer(reduce, initState);
    const actions = useMemo(() => createActions(dispatch), []);

    return [state, actions];
  }

  return [Context, useRedux];
}

export { create as createContext };

export const createCache = (key) => ({
  get: () => JSON.parse(localStorage.getItem(key) || "{}"),
  set: debounce(1000, (t) => localStorage.setItem(key, JSON.stringify(t))),
});

export const classNames = (...args) => args.filter(Boolean).join(" ");
