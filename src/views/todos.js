import todos from "../controllers/todos.js";

const view = {
  events: {
    "change .toggle": "handleToggle",
    "dblclick label": "edit",
    "click .destroy": "clear",
    "keypress .edit": "updateOnEnter",
    "keydown .edit": "revertOnEscape",
    "blur .edit": "close",
  },

  el: document.createElement("div"),

  tpl: _.template(_.unescape($("#todos-template").innerHTML)),

  init() {
    for (const key in this.events) {
      const [event, selector] = key.split(" ");
      const target = this.el.$(selector);

      if (target) {
        target.on(event, this[this.events[key]]);
      }
    }

    window.on("todo:changed", () => this.render());
  },

  handleBlur(todo, evt) {
    const li = evt.target.closest("li");
    li.classList.remove("editing");
    evt.target.value = todo.text;
  },

  handleDblClick(evt) {
    const li = evt.target.closest("li");
    li.classList.add("editing");
    li.querySelector(".edit").select();
  },

  handleKeyUp(props, evt) {
    const text = evt.target.value.trim();
    const li = evt.target.closest("li");

    if (evt.key === "Enter" && text) {
      li.classList.remove("editing");
      props.onEdit(evt);
    } else if (evt.key === "Escape") {
      li.classList.remove("editing");
    }
  },

  handleToggle(evt) {
    todos.toggle(evt.target.closest("li").dataset.uid);
  },

  render() {
    console.log(this);
    const content = DOM.create(this.tpl({ todos: todos.filtered }));
    this.el.append(content);
    return content;
  },
};

view.init();

export default () => view.render();
