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
      onchange=${props.onToggleAll}
    />
    <label for="toggle-all">Mark all as complete</label>
  `;
};
