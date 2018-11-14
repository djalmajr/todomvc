const toggleAll = hyperHTML.wire();

function ToggleAll(render, controller) {
  if (!controller.filtered.length) {
    return render`${[]}`;
  }

  return render`
    <input
      id="toggle-all"
      type="checkbox"
      class=${`header-toggle${controller.allDone ? " checked" : ""}`}
      checked=${controller.allDone}
      onchange=${controller.onToggleAll}
    />
    <label for="toggle-all">Mark all as complete</label>
  `;
}

export default (render, controller) => render`
  <header class="header">
    <h1 class="header-title">todos</h1>
    ${ToggleAll(toggleAll, controller)}
    <input
      autofocus
      class="header-input"
      placeholder="What needs to be done?"
      onkeypress=${controller.onAdd}
    />
  </header>
`;
