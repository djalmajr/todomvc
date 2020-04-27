export const filterTodos = (...args) => {
  if (args.length < 2) {
    return filterTodos.bind(null, ...args);
  }

  const [hash, todos] = args;

  if (hash === "all") {
    return Object.values(todos);
  }

  return Object.values(todos).filter(
    hash === "active" ? (t) => !t.completed : (t) => t.completed
  );
};
