import HeaderView from "./header.js";
import TodosView from "./todos.js";
import FooterView from "./footer.js";
import controller from "../controllers/todos.js";

class AppView {
  constructor() {
    this.$el = $($("#app-template").html());
    controller.on("todos:changed", () => this.render());
  }

  render() {
    this.$el
      .find(".app-content")
      .empty()
      .append(new HeaderView().$el)
      .append(new TodosView().$el)
      .append(new FooterView().$el);

    return this;
  }
}

export default AppView;
