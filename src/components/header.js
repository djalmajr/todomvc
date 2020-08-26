import { html } from 'uland';

export function Header({ allDone, onAdd, onToggleAll }) {
  const handleAdd = (evt) => {
    const text = evt.target.value.trim();

    if (evt.key === 'Enter' && text) {
      evt.target.value = '';
      onAdd(text);
    }
  };

  return html`
    <header>
      <h1 class="callout">todos</h1>
      <div .hidden=${!onToggleAll}>
        <input
          id="toggle-all"
          type="checkbox"
          class=${`toggle-all ${allDone && 'toggle-all--checked'}`}
          checked=${allDone}
          onchange=${onToggleAll}
        />
        <label for="toggle-all">Mark all as complete</label>
      </div>
      <input
        autofocus
        class="py-4 pr-4 pl-16 shadow-inner border-none"
        placeholder="What needs to be done?"
        onkeypress=${handleAdd}
      />
    </header>
  `;
}
