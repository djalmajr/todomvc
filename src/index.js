import h from "hyperhtml";
import { autorun } from "mobx";
import renderApp from "./container/app";

const render = component => {
  autorun(() => {
    const container = document.querySelector("#__wrapper__");
    h.bind(container)`${component}`;
  });
};

if (module.hot) {
  module.hot.accept("./container/app", () => {
    render(require("./container/app").default);
  });
}

render(renderApp);
