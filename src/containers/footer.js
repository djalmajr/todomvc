import React from "react";
import { ClearButton } from "../components";
import { withTodos } from "../contexts";
import { filterTodos } from "../selectors";
import "./footer.css";

const cn = (hash, curr) => (hash === curr ? "selected" : "");

export const Footer = withTodos((props) => {
  const { clearCompletedTodos, route, todos } = props;
  const allTodos = filterTodos("/", todos);
  const completed = filterTodos("/completed", todos);
  const incompleted = filterTodos("/active", todos);
  const remaining = incompleted.length;

  if (!allTodos.length) return null;

  return (
    <footer className="footer__container">
      <span className="footer__count">
        <strong>{remaining}</strong> item{~-remaining ? "s" : ""} left
      </span>
      <ul className="footer__filters">
        <li>
          <a className={cn(route.slug, "/")} href="#/">
            All
          </a>
        </li>
        <li>
          <a className={cn(route.slug, "/active")} href="#/active">
            Active
          </a>
        </li>
        <li>
          <a className={cn(route.slug, "/completed")} href="#/completed">
            Completed
          </a>
        </li>
      </ul>
      <ClearButton
        isEmpty={!completed.length}
        onClick={() => clearCompletedTodos()}
      />
    </footer>
  );
});
