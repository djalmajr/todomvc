import { curryN } from "../helpers";

export const filterTodos = curryN(2, (filter, todos) => {
  if (filter === "all") {
    return Object.values(todos);
  }

  return Object.values(todos).filter(
    filter === "active" ? (t) => !t.completed : (t) => t.completed
  );
});
