import ToggleAll from "../components/ToggleAll.js";

const toggleAll = hyperHTML.wire();

const handleAdd = props => evt => {
  const text = evt.target.value.trim();

  if (evt.key === "Enter" && text) {
    evt.target.value = "";
    props.onAdd(text);
  }
};

export default (render, props) => render`
  <header class="header">
    <h1 class="header-title">todos</h1>
    ${ToggleAll(toggleAll, props)}
    <input
      autofocus
      class="header-input"
      placeholder="What needs to be done?"
      onkeypress=${handleAdd(props)}
    />
  </header>
`;
