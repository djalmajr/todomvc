import controller from "../controllers/todos.js";

class TodosView {
  get events() {
    return {
      "change .toggle": "handleToggle",
      "dblclick label": "handleDblClick",
      "click .destroy": "handleRemove",
      "blur .edit": "handleBlur",
      "keyup .edit": "handleKeyUp",
    };
  }

  get data() {
    return {
      todos: _.map(controller.filtered, t => t),
    };
  }

  constructor() {
    this.tpl = _.template($("#todos-template").html());
    this.$el = $(this.tpl(this.data));

    _.forEach(this.events, (handler, key) => {
      const [event, ...selector] = key.split(" ");
      this.$el.on(event, selector.join(" "), this[handler]);
    });
  }

  handleDblClick(evt) {
    $(evt.target)
      .closest("li")
      .addClass("editing")
      .find(".edit")
      .select();
  }

  handleBlur(evt) {
    $(evt.target)
      .closest("li")
      .removeClass("editing");
  }

  handleKeyUp(evt) {
    const $input = $(evt.target);
    const $li = $input.closest("li");
    const text = $input.val().trim();

    if (evt.key === "Enter" && text) {
      $li.removeClass("editing");
      controller.edit({ text, uid: $li.attr("data-uid") });
    } else if (evt.key === "Escape") {
      $li.removeClass("editing");
    }
  }

  handleRemove(evt) {
    controller.remove(evt.target.closest("li").dataset.uid);
  }

  handleToggle(evt) {
    controller.toggle(evt.target.closest("li").dataset.uid);
  }

  render() {
    this.$el.empty().append($(this.tpl(this.data)));
    return this;
  }
}

export default TodosView;
