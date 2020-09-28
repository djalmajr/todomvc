// if (process.env.NODE_ENV === "development") {
//   require("preact/debug");
// }

import { html } from "htm/preact";
import { render } from "preact";
import { App } from "./containers/app";
import { TodoProvider } from "./contexts/todos";
import "./index.css";

render(
  html`<${TodoProvider}><${App} /><//>`, // prettier-ignore
  document.querySelector("#root")
);
