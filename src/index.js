import { Component as $, html, render } from "uland";
import { App } from "./containers/app";
import { provideTodos } from "./contexts/todos";

const Root = $(() => (provideTodos(), html`${App()}`));

render(document.querySelector("#root"), Root);
