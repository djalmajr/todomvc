import { html } from "htm/preact";
import { createContext } from "preact";
import { useContext, useMemo, useReducer } from "preact/hooks";
import { debounce } from "./function";

function createCtx({ initState, reducers, actions: createActions }) {
  const Context = createContext(initState);

  const useCtx = () => useContext(Context);

  function withCtx(Component) {
    return (props) => Component({ ...props, ...useContext(Context) });
  }

  function reduce(state, action) {
    return reducers(state, action.payload)[action.type]();
  }

  function Provider({ children }) {
    const [state, dispatch] = useReducer(reduce, initState);
    const actions = useMemo(() => createActions(dispatch), []);

    return html`
      <${Context.Provider} value=${{ ...state, ...actions }}>
        ${children}
      <//>
    `;
  }

  return [Provider, useCtx, withCtx];
}

export { createCtx as createContext };

export const createCache = (key) => ({
  get: () => JSON.parse(localStorage.getItem(key) || "{}"),
  set: debounce(1000, (t) => localStorage.setItem(key, JSON.stringify(t))),
});

export const classNames = (...args) => args.filter(Boolean).join(" ");
