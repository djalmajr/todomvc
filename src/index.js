import { html } from "htm/preact";
import { render } from "preact";
import { App } from "./containers";
import { TodoProvider } from "./contexts";
import "./index.css";

render(
  html`
    <${TodoProvider}>
      <${App} />
    <//>
  `,
  document.querySelector("#root")
);
