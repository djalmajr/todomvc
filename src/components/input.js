import h from "hyperhtml";
import cn from "classnames";
import styles from "./input.less";

export default (props = {}) => h.wire(props, ":input")`
  <input
    class=${cn(styles.input, props.className)}
    autofocus=${!!props.autofocus}
    placeholder=${props.placeholder}
    onkeypress=${props.onKeyPress}
  />
`;
