import { render } from "https://unpkg.com/lit-html?module";
import controller from "./controllers/todos.js";
import renderApp from "./views/app.js";

const wrapper = document.querySelector("#__wrapper__");

controller.init(() => render(renderApp(), wrapper));
controller.update();
