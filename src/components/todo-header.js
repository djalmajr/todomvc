import { component, html, useRef } from "https://unpkg.com/haunted/haunted.js";
import { css } from "https://unpkg.com/lit-element/lib/css-tag.js";
import { classNames as cn } from "../helpers/classNames.js";
import { ref } from "../helpers/directives.js";
import { emit } from "../helpers/dom.js";
import { useStyles } from "../hooks/useStyles.js";
import inputStyle from "../styles/input.css.js";

const style = css`
  :host {
    display: flex;
    font: 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 300;
    line-height: 1.4em;
    width: 100%;
  }

  .title {
    color: rgba(175, 47, 47, 0.15);
    font-size: 100px;
    font-weight: 100;
    position: absolute;
    text-align: center;
    text-rendering: optimizeLegibility;
    top: -155px;
    user-select: none;
    width: 100%;
  }

  .input {
    background: rgba(0, 0, 0, 0.003);
    border: none;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    flex: 1;
    padding: 16px 16px 16px 60px;
    outline: none;
  }

  .toggle-all {
    border: none;
    opacity: 0;
    position: absolute;
    text-align: center;
  }

  .toggle-all + label {
    cursor: pointer;
    font-size: 0;
    height: 34px;
    left: -13px;
    position: absolute;
    top: 13px;
    transform: rotate(90deg);
    width: 60px;
    z-index: 1;
  }

  .toggle-all + label:before {
    color: #e6e6e6;
    content: "❯";
    font-size: 22px;
    padding: 10px 27px;
  }

  .toggle-all.checked + label:before {
    color: #737373;
  }

  /*
  Hack to remove background from Mobile Safari.
  Can't use it globally since it destroys checkboxes in Firefox
*/
  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    .toggle-all {
      background: none;
    }
  }
`;

export function TodoHeader() {
  const inputRef = useRef(null);

  const handleKeyPress = (evt) => {
    const text = inputRef.current.value.trim();

    if (evt.key === "Enter" && text) {
      inputRef.current.value = "";
      emit(this, "add", text);
    }
  };

  const renderToggleAll = () => {
    if (!this.showCheck) {
      return "";
    }

    return html`
      <input
        id="toggle-all"
        type="checkbox"
        class="${cn("toggle-all", this.allDone && "checked")}"
        ?checked=${this.allDone}
        @change=${() => emit(this, "toggle")}
      />
      <label for="toggle-all">Mark all as complete</label>
    `;
  };

  useStyles(this, [inputStyle, style]);

  return html`
    <header>
      <h1 class="title">todos</h1>
      ${renderToggleAll()}
      <input
        ref=${ref(inputRef)}
        autofocus
        class="input"
        placeholder="What needs to be done?"
        @keypress=${handleKeyPress}
      />
    </header>
  `;
}

if (!customElements.get("todo-header")) {
  customElements.define("todo-header", component(TodoHeader));
}
