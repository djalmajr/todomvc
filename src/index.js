import { html } from "htm/preact";
import { render } from "preact";
import { useState } from "preact/hooks";
import { App } from "./containers";
import { TodoProvider, useTodoReducer } from "./contexts";
import { getHash } from "./utils";
import "./index.css";

const Root = () => {
  const [hash, setHash] = useState(getHash());
  const todoProps = useTodoReducer();

  window.onhashchange = () => setHash(getHash());

  return html`
    <${TodoProvider} value=${{ ...todoProps, hash }}>
      <${App} />
    <//>
  `;
};

render(html`<${Root} />`, document.querySelector("#root"));
