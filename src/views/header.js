import todos from "../controllers/todos.js";

const tpl = _.template(_.unescape($("#header-template").innerHTML));

export default () => {
  return DOM.create(tpl({ allDone: todos.allDone }));
};
