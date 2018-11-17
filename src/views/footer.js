import todos from "../controllers/todos.js";

const tpl = _.template(_.unescape($("#footer-template").innerHTML));

export default () => {
  return DOM.create(
    tpl({
      hash: todos.hash,
      filters: todos.filters,
      left: todos.incompleted.length,
      showClear: todos.completed.length,
    })
  );
};
