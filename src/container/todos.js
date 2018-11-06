import { Component } from "hyperhtml";
import { reaction } from "mobx";
import Todo from "./todo";
import store from "../store";
import styles from "./todos.less";

class Main extends Component {
  onconnected() {
    reaction(
      () => store.filteredTodos.map(JSON.stringify),
      () => this.render()
    );
  }

  render() {
    return this.html`
      <section class=${styles.container} onconnected=${this}>
        <ul class=${styles.todos}>
          ${store.filteredTodos.map(t => Todo.for(t, t.id))}
        </ul>
      </section>
    `;
  }
}

export default Main;
