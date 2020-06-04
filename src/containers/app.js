import React from "react";
import { Route } from "../components";
import { withTodos } from "../contexts";
import { filterTodos } from "../selectors";
import { Footer } from "./footer";
import { Header } from "./header";
import { Todo } from "./todo";
import "./app.css";

export const App = withTodos(({ todos }) => (
  <div className="app__container">
    <Route match={["/", "/active", "/completed"]}>
      {({ route }) => (
        <section className="app__content">
          <Route component={Header} />
          <section className="app__todos">
            <ul>
              {filterTodos(route.slug, todos).map((todo) => (
                <Todo key={todo.uid} todo={todo} />
              ))}
            </ul>
          </section>
          <Route component={Footer} />
        </section>
      )}
    </Route>
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
));
