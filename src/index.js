import { html } from "htm/preact";
import { render } from "preact";
import { useMemo, useReducer, useState } from "preact/hooks";
import { App } from "./containers";
import {
  createTodoActions,
  initTodoState,
  TodoContext,
  todoReducer,
} from "./contexts";
import { getHash } from "./utils";
import "./index.css";

const Root = () => {
  const [hash, setHash] = useState(getHash());
  const [todos, dispatch] = useReducer(todoReducer, initTodoState);
  const todoContext = useMemo(() => createTodoActions(dispatch), []);

  window.onhashchange = () => setHash(getHash());

  return html`
    <${TodoContext.Provider} value=${{ ...todoContext, todos, hash }}>
      <${App} />
    <//>
  `;
};

render(html`<${Root} />`, document.querySelector("#root"));
