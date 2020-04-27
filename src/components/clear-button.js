import { html } from "htm/preact";
import "./clear-button.css";

export const ClearButton = ({ isEmpty, onClick }) => {
  if (isEmpty) {
    return null;
  }

  return html`
    <button class="clear-button" onclick=${onClick}>
      Clear completed
    </button>
  `;
};
