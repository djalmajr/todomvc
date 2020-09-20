import { css, define } from "uce";
import { events, mixin } from "uce-mixins";
import { classNames as cn } from "../helpers";
import { ActionTypes } from "../store";

const style = (el) => css`
  ${el} {
    display: flex;
    font: 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 300;
    line-height: 1.4em;
    width: 100%;
  }

  ${el} .header__title {
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

  ${el} .header__input {
    background: rgba(0, 0, 0, 0.003);
    border: none;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    flex: 1;
    padding: 16px 16px 16px 60px;
    outline: none;
  }

  ${el} .header__toggle {
    border: none;
    opacity: 0;
    position: absolute;
    text-align: center;
  }

  ${el} .header__toggle + label {
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

  ${el} .header__toggle + label:before {
    color: #e6e6e6;
    content: "❯";
    font-size: 22px;
    padding: 10px 27px;
  }

  ${el} .header__toggle--checked + label:before {
    color: #737373;
  }

  /*
   * Hack to remove background from Mobile Safari.
   * Can't use it globally since it destroys checkboxes in Firefox
   */
  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    ${el} .header__toggle {
      background: none;
    }
  }
`;

define("todo-header", mixin(events, {
  style,
  props: {
    allDone: false,
    showCheck: false,
  },
  events: {
    "change .header__toggle"() {
      this.emit(ActionTypes.TOGGLE_ALL);
    },
    "keypress .header__input"(evt) {
      const text = evt.target.value.trim();

      if (evt.key === "Enter" && text) {
        evt.target.value = "";
        this.emit(ActionTypes.ADD, text);
      }
    },
  },
  render() {
    const { allDone, showCheck } = this;

    this.html`
      <h1 class="header__title">todos</h1>
      <div .hidden=${!showCheck}>
        <input
          id="toggle-all"
          type="checkbox"
          class="${cn("header__toggle", allDone && "header__toggle--checked")}"
          .checked=${allDone}
        />
        <label for="toggle-all">Mark all as complete</label>
      </div>
      <input
        autofocus
        class="header__input"
        placeholder="What needs to be done?"
      />
    `;
  },
}));
