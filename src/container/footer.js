import h from "hyperhtml";
import cn from "classnames";
import store from "../store";
import renderButton from "../components/button";
import styles from "./footer.less";

const renderClear = () => {
  if (!store.activeTodos.length) {
    return h.wire()`${[]}`;
  }

  return renderButton({
    className: styles.clear,
    children: "Clear completed",
    onClick(evt) {
      evt.preventDefault();
      store.clearCompleted();
    },
  });
};

const renderFilter = text => {
  const filter = text.toLowerCase();
  const className = cn({
    [styles.selected]: store.filter === filter,
  });

  return h.wire()`
    <li>
      <a href=${`#/${filter}`} class=${className}>
        ${text}
      </a>
    </li>
  `;
};

export default () => {
  if (!Object.values(store.todos).length) {
    return h.wire()`${[]}`;
  }

  return h.wire()`
    <footer class=${styles.container}>
      <span class=${styles.count}>
        <strong>${store.incompletedTodos.length}</strong> ${store.remaining}
      </span>
      <ul class=${styles.filters}>
        ${["All", "Active", "Completed"].map(renderFilter)}
      </ul>
      ${renderClear()}
    </footer>
  `;
};
