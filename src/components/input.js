import { wire } from "hyperhtml";
import cn from "classnames";
import styles from "./input.less";

export default (props = {}) => wire(props, ":input")`
  <input
    autofocus=${!!props.autofocus}
    class=${cn(styles.input, props.className)}
    placeholder=${props.placeholder}
    value=${props.value}
    onblur=${props.onBlur}
    onkeypress=${props.onKeyPress}
    onkeyup=${props.onKeyUp}
  />
`;
