import { html, render } from "uce";
import "./containers/todo-app";
import "./containers/todo-footer";
import "./containers/todo-header";
import "./containers/todo-item";

render(document.querySelector("#root"), html`<todo-app />`);
