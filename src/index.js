import controller from "./controllers/Todos.js";
import App from "./containers/App.js";

const app = hyperHTML.wire();
const html = hyperHTML.bind(document.querySelector("#__wrapper__"));

controller.init(todos => html`${App(app, todos)}`);
controller.update();
