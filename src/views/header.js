import controller from "../controllers/todos.js";

class HeaderView {
  get data() {
    return {
      allDone: controller.allDone,
      hasTodos: !_.isEmpty(controller.filtered),
    };
  }

  constructor() {
    this.tpl = _.template($("#header-template").html());
    this.$el = $(this.tpl(this.data));
    this.$el.on("keypress", ".header-input", this.handleKeyPress);
    this.$el.on("change", ".header-toggle", this.handleToggleAll);
  }

  handleKeyPress(evt) {
    const $input = $(evt.target);
    const text = $input.val().trim();

    if (evt.key === "Enter" && text) {
      $input.focus().val("");
      controller.add(text);
    }
  }

  handleToggleAll() {
    controller.toggleAll();
  }

  render() {
    this.$el.empty().append($(this.tpl(this.data)));
    return this;
  }
}

export default HeaderView;
