import React from "react";
import ReactDOM from "react-dom";
import { Router } from "./components";
import { App } from "./containers";
import { TodosProvider, useTodos } from "./contexts";
import "./index.css";

const Root = () => {
  const [todos, actions] = useTodos();

  return (
    <TodosProvider value={{ todos, ...actions }}>
      <Router>
        <App />
      </Router>
    </TodosProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
