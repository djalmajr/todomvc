import { createContext, useContext, useMemo, useReducer } from "uland";

function createCtx({ initState, reducers, actions: createActions }) {
  const Context = createContext(initState);

  const useCtx = () => useContext(Context);

  const withCtx = (child) => (props) => {
    return child(assign({}, props, useContext(Context)));
  };

  function reduce(state, action) {
    return reducers(state, action.payload)[action.type]();
  }

  function Provider() {
    const [state, dispatch] = useReducer(reduce, initState);
    const actions = useMemo(() => createActions(dispatch), []);
    Context.provide({ ...state, ...actions });
  }

  return [Provider, useCtx, withCtx];
}

export { createCtx as createContext };
