const handleChange = props => () => props.onToggleAll();

export default (render, props) => {
  if (!props.filtered.length) {
    return render`${[]}`;
  }

  return render`
    <input
      id="toggle-all"
      type="checkbox"
      class=${`header-toggle${props.allDone ? " checked" : ""}`}
      checked=${props.allDone}
      onchange=${handleChange(props)}
    />
    <label for="toggle-all">Mark all as complete</label>
  `;
};
