import React from "react";
import { withTodos } from "../contexts";
import { filterTodos } from "../utils";
import { Footer } from "./footer";
import { Header } from "./header";
import { Todo } from "./todo";
import "./app.css";

export const App = withTodos(({ hash, todos }) => {
  const filtered = filterTodos(hash, todos);

  return (
    <div className="app__container">
      <section className="app__content">
        <Header />
        <section className="app__todos">
          <ul>
            {filtered.map((todo) => (
              <Todo key={todo.uid} todo={todo} />
            ))}
          </ul>
        </section>
        <Footer />
      </section>
      <footer className="app__info">
        <p>Double-click to edit a todo</p>
        <p>
          Written by <a href="https://djalmajr.com">Djalma Jr.</a>
        </p>
        <p>
          Not part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>
  );
});
