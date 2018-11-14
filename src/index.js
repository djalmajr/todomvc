import controller from "./controllers/todos.js";
import App from "./views/app.js";

const app = hyperHTML.wire();
const html = hyperHTML.bind(document.querySelector("#__wrapper__"));

controller.init(todos => html`${App(app, todos)}`);
controller.update();
