import {
  createContext,
  useReducer,
  useMemo,
} from "https://unpkg.com/haunted/haunted.js";

function create({ initState, reducers, actions: createActions }) {
  const Context = createContext({});

  function reduce(state, action) {
    return reducers(state, action.payload)[action.type]();
  }

  function useRedux() {
    const [state, dispatch] = useReducer(reduce, initState || {});
    const actions = useMemo(() => createActions(dispatch), []);

    return [state, actions];
  }

  return [Context, useRedux];
}

export { create as createContext };
