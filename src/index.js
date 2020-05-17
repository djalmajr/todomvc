import React, { useState } from "react";
import ReactDOM from "react-dom";
import { App } from "./containers";
import { TodoProvider, useTodoReducer } from "./contexts";
import { getHash } from "./utils";
import "./index.css";

const Root = () => {
  const [hash, setHash] = useState(getHash());
  const todoProps = useTodoReducer();

  window.onhashchange = () => setHash(getHash());

  return (
    <TodoProvider value={{ ...todoProps, hash }}>
      <App />
    </TodoProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
