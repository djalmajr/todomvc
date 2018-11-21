import App from "./views/app.js";

$("#__wrapper__")
  .empty()
  .append(new App().render().$el);
