import { html } from "htm/preact";
import "./toggle-all.css";

export const ToggleAll = ({ allDone, isEmpty, onChange }) => {
  if (isEmpty) {
    return null;
  }

  return html`
    <input
      id="toggle-all"
      type="checkbox"
      class=${`toggle-all ${allDone && "toggle-all--checked"}`}
      checked=${allDone}
      onchange=${onChange}
    />
    <label for="toggle-all">Mark all as complete</label>
  `;
};
