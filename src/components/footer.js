import { html } from "uland";

const cn = (hash, curr) => (hash === curr ? "selected" : "");

export function Footer({ hash, remaining, visible, onClear }) {
  return html`
    <footer
      .hidden=${!visible}
      class="border-t border-solid border-gray-300 h-12 py-4 px-5 text-center frame xs:h-20"
    >
      <span class="float-left text-left">
        <strong class="font-light">${remaining}</strong>
        item${~-remaining ? "s" : ""} left
      </span>
      <ul class="footer__filters xs:bottom-3">
        <li><a class="${cn(hash, "all")}" href="#/all">All</a></li>
        <li><a class="${cn(hash, "active")}" href="#/active">Active</a></li>
        <li>
          <a class="${cn(hash, "completed")}" href="#/completed">Completed</a>
        </li>
      </ul>
      <button .hidden=${!onClear} class="clear-button" onclick=${onClear}>
        Clear completed
      </button>
    </footer>
  `;
}
