import h from "hyperhtml";
import cn from "classnames";
import store from "../store";
import renderInput from "../components/input";
import styles from "./header.less";

const handleChange = () => {
  store.toggleAllTodos();
};

const handleKeyPress = evt => {
  const text = evt.target.value.trim();

  if (evt.key === "Enter" && text) {
    evt.target.value = "";
    store.addTodo(text);
    setTimeout(() => evt.target.focus());
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
      class=${cn(styles.toggle, { [styles.checked]: store.allDone })}
      checked=${store.allDone}
      onchange=${handleChange}
    />
    <label for="toggle-all">Mark all as complete</label>
  `;
};

const inputProps = {
  autofocus: true,
  className: styles.input,
  placeholder: "What needs to be done?",
  onKeyPress: handleKeyPress,
};

export default () => h.wire()`
  <header class=${styles.container}>
    <h1>todos</h1>
    ${renderToggle()}
    ${renderInput(inputProps)}
  </header>
`;
