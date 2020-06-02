import React from "react";

export function createContext({ initState, reducers, actions: createActions }) {
  const Context = React.createContext({});

  function reduce(state, action) {
    return reducers(state, action.payload)[action.type]();
  }

  function withContext(Component) {
    return (props) => Component({ ...props, ...React.useContext(Context) });
  }

  function useReducer() {
    const [state, dispatch] = React.useReducer(reduce, initState || {});
    const actions = React.useMemo(() => createActions(dispatch), []);

    return [state, actions];
  }

  return [Context.Provider, useReducer, withContext];
}
