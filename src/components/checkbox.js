import h from "hyperhtml";
import cn from "classnames";
import * as checkStyles from "./checkbox.less";
// import * as inputStyle from "./input.less";

export default (props = {}) => h.wire(props, ":checkbox")`
  <input
    type="checkbox"
    class="${cn(checkStyles.checkbox, props.className)}"
    checked=${!!props.checked}
    onchange=${props.onChange}
  />
`;
