import { Component, wire } from "hyperhtml";
import { reaction } from "mobx";
import cn from "classnames";
import store from "../store";
import renderInput from "../components/input";
import styles from "./header.less";

class Header extends Component {
  onconnected() {
    reaction(() => `${store.showToggle}:${store.allDone}`, () => this.render());
  }

  renderToggle() {
    if (!store.showToggle) {
      return wire()`${[]}`;
    }

    return wire()`
      <input
        id="toggle-all"
        type="checkbox"
        class=${cn(styles.toggle, { [styles.checked]: store.allDone })}
        checked=${store.allDone}
        onchange=${() => store.toggleAllTodos()}
      />
      <label for="toggle-all">Mark all as complete</label>
    `;
  }

  render() {
    const inputProps = {
      autofocus: true,
      className: styles.input,
      placeholder: "What needs to be done?",
      onKeyPress(evt) {
        const text = evt.target.value.trim();

        if (evt.key === "Enter" && text) {
          evt.target.value = "";
          store.addTodo(text);
          setTimeout(() => evt.target.focus(), 10);
        }
      },
    };

    return this.html`
      <header class=${styles.container} onconnected=${this}>
        <h1>todos</h1>
        ${this.renderToggle()}
        ${renderInput(inputProps)}
      </header>
    `;
  }
}

export default Header;
