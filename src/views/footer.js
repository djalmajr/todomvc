import controller from "../controllers/todos.js";

class FooterView {
  get data() {
    return {
      hash: controller.hash,
      filters: controller.filters,
      left: controller.incompleted.length,
      showClear: controller.completed.length,
      hasTodos: !_.isEmpty(controller.todos),
    };
  }

  constructor() {
    this.tpl = _.template($("#footer-template").html());
    this.$el = $(this.tpl(this.data));
    this.$el.on("click", ".footer-clear", this.handleClear);
  }

  handleClear() {
    controller.clear();
  }

  render() {
    this.$el.empty().append($(this.tpl(this.data)));
    return this;
  }
}

export default FooterView;
