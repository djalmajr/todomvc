import { bind as hyper } from "hyperhtml";
import App from "./container/app";

const render = component => {
  const container = document.querySelector("#__wrapper__");
  hyper(container)`${component}`;
};

if (module.hot) {
  module.hot.accept("./container/app", () => {
    render(require("./container/app").default);
  });
}

render(App);
