export const reduceState = (...args) => {
  if (args.length < 2) {
    return reduceState.bind(null, ...args);
  }

  const [cb, state] = args;

  return Object.keys(state).reduce(cb, {});
};
