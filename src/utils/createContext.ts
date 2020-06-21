import { createContext, useReducer, useMemo } from 'haunted';
import { Context } from 'haunted/lib/create-context';

type Action<T> = {
  type: T;
  payload?: any;
};

type CreateContextProps<S, A, T extends string> = {
  initState?: S;
  actions: (dispatch: (action: Action<T>) => void) => A;
  reducers: (state: S, payload?: Action<T>['payload']) => Record<T, () => S>;
};

type ContextResult<S, A> = [Context<S & A>, () => [S, A]];

function create<S, A, T extends string>({
  initState,
  reducers,
  actions: createActions,
}: CreateContextProps<S, A, T>) {
  const Context = createContext<S & A>({} as S & A);

  function reduce(state: S, action: Action<T>): S {
    return reducers(state, action.payload)[action.type]();
  }

  function useRedux() {
    const [state, dispatch] = useReducer(reduce, (initState || {}) as S);
    const actions = useMemo(() => createActions(dispatch), []);

    return [state, actions] as [S, A];
  }

  return [Context, useRedux] as ContextResult<S, A>;
}

export { create as createContext };
