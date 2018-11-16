import ToggleAll from "./toggleAll.js";

const toggleAll = hyperHTML.wire();

export default (render, props) => render`
  <header class="header">
    <h1 class="header-title">todos</h1>
    ${ToggleAll(toggleAll, props)}
    <input
      autofocus
      class="header-input"
      placeholder="What needs to be done?"
      onkeypress=${props.onAdd}
    />
  </header>
`;
