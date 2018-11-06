import { Component, wire } from "hyperhtml";
import { reaction } from "mobx";
import cn from "classnames";
import store from "../store";
import renderButton from "../components/button";
import styles from "./footer.less";

class Footer extends Component {
  get total() {
    return Object.values(store.todos).length;
  }

  get remaining() {
    return store.incompletedTodos.length;
  }

  onconnected() {
    reaction(
      () => `${store.filter}:${this.total}:${this.remaining}`,
      () => this.render()
    );
  }

  renderClear() {
    if (!store.completedTodos.length) {
      return wire()`${[]}`;
    }

    return renderButton({
      className: styles.clear,
      children: "Clear completed",
      onClick(evt) {
        evt.preventDefault();
        store.clearCompleted();
      },
    });
  }

  renderFilter(text) {
    const filter = text.toLowerCase();
    const className = cn({ [styles.selected]: store.filter === filter });

    return wire()`
      <li><a href=${`#/${filter}`} class=${className}>${text}</a></li>
    `;
  }

  render() {
    if (!this.total) {
      return this.html`${[]}`;
    }

    return this.html`
      <footer class=${styles.container} onconnected=${this}>
        <span class=${styles.count}>
          <strong>${this.remaining}</strong> ${store.remaining}
        </span>
        <ul class=${styles.filters}>
          ${store.filters.map(f => this.renderFilter(f))}
        </ul>
        ${this.renderClear()}
      </footer>
    `;
  }
}

export default Footer;
