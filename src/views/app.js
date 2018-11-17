import header from "./header.js";
import todos from "./todos.js";
import footer from "./footer.js";

export default () => {
  const el = DOM.create($("#app-template").innerHTML);
  const content = el.$(".app-content");

  content.append(header());
  content.append(todos());
  content.append(footer());

  return el;
};
