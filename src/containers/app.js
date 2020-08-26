import { Component, html, useEffect } from "uland";
import { Footer, Header, Todo } from "../components";
import { filterTodos, todoCache, useTodos } from "../contexts";

const isVisible = (hash, todo) => {
  switch (hash) {
    case "active":
      return !todo.completed;
    case "completed":
      return todo.completed;
    default:
      return true;
  }
};

export const App = Component(() => {
  const {
    hash,
    updateHash,
    todos,
    clearCompletedTodos,
    addTodo,
    editTodo,
    removeTodo,
    toggleTodo,
    toggleAllTodos,
  } = useTodos();

  const filtered = filterTodos(hash, todos);
  const completed = filterTodos("completed", todos);
  const incompleted = filterTodos("active", todos);

  useEffect(() => (window.onhashchange = updateHash), [updateHash]);
  useEffect(() => todoCache.set(todos), [todos]);

  return html`
    <div class="my-0 mx-auto max-w-lg text-gray-700">
      <section class="relative bg-white mt-40 mx-0 mb-8 shadow-xl">
        ${Header({
          allDone: filtered.every((t) => t.completed),
          onToggleAll: filtered.length && toggleAllTodos,
          onAdd: addTodo,
        })}
        <section class="relative border-t border-solid border-gray-200 z-10">
          <ul>
            ${Object.keys(todos).map((uid) =>
              Todo({
                todo: todos[uid],
                visible: isVisible(hash, todos[uid]),
                onEdit: editTodo,
                onRemove: removeTodo,
                onToggle: toggleTodo,
              })
            )}
          </ul>
        </section>
        ${Footer({
          hash,
          todos,
          visible: !!Object.keys(todos).length,
          remaining: incompleted.length,
          onClear: completed.length && clearCompletedTodos,
        })}
      </section>
      <footer class="mt-16 mx-auto mb-0 text-gray-500 text-xs text-center">
        <p>Double-click to edit a todo</p>
        <p>Written by <a href="https://djalmajr.com">Djalma Jr.</a></p>
        <p>
          Not (yet 😆) part of
          <a href="http://todomvc.com" class="font-bold hover:underline">
            TodoMVC
          </a>
        </p>
      </footer>
    </div>
  `;
});
