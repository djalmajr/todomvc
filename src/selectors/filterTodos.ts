import { Todo } from '../contexts';
import { curryN } from '../utils';

export const filterTodos = curryN(2, (filter: string, todos: Todo[]) => {
  if (filter === '/') {
    return Object.values(todos);
  }

  return Object.values(todos).filter(
    filter === '/active' ? (t: Todo) => !t.completed : (t: Todo) => t.completed
  );
});
