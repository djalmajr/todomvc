import { wire } from "hyperhtml";
import cn from "classnames";
import styles from "./button.less";

export default (props = {}) => wire(props, ":button")`
  <button
    class=${cn(styles.button, props.className)}
    onclick=${props.onClick}
  >
    ${props.children}
  </button>
`;
