import h from "hyperhtml";
import store from "../store";
import renderInput from "../components/input";
import styles from "./header.less";

const handleKeyPress = evt => {
  const text = evt.target.value.trim();

  if (evt.key === "Enter" && text) {
    evt.target.value = "";
    store.addTodo(text);
  }
};

const renderToggle = () => {
  if (!store.showToggle) {
    return h.wire()`${[]}`;
  }

  return h.wire()`
    <input
      id="toggle-all"
      type="checkbox"
      class=${styles.toggleAll}
      checked=${store.allDone}
      onchange=${store.toggleAllTodos}
    />
    <label for="toggle-all">
      Mark all as complete
    </label>
  `;
};

const renderHeader = () => {
  const inputProps = {
    autofocus: true,
    className: styles.input,
    placeholder: "What needs to be done?",
    onKeyPress: handleKeyPress,
  };

  return h.wire()`
    <header class="${styles.container}">
      <h1>todos</h1>
      ${renderToggle()}
      ${renderInput(inputProps)}
    </header>
  `;
};

export default renderHeader;
