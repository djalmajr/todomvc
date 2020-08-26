import { Component, html, render } from "uland";
import { App } from "./containers";
import { provideTodos } from "./contexts";

const Root = Component(() => (provideTodos(), html`${App()}`));

render(document.querySelector("#root"), Root);
