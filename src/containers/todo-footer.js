import { css, define } from "uce";
import { events, mixin } from "uce-mixins";

const style = (el) => css`
  ${el} {
    font: 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 300;
    line-height: 1.4em;
  }

  ${el} .footer__container {
    border-top: 1px solid #e6e6e6;
    color: #777;
    height: 20px;
    padding: 10px 15px;
    text-align: center;
  }

  ${el} .footer__container:before {
    bottom: 0;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
      0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
      0 17px 2px -6px rgba(0, 0, 0, 0.2);
    content: "";
    height: 50px;
    left: 0;
    overflow: hidden;
    position: absolute;
    right: 0;
  }

  ${el} .footer__count {
    float: left;
    text-align: left;
  }

  ${el} .footer__count strong {
    font-weight: 300;
  }

  ${el} .footer__filters {
    left: 0;
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    right: 0;
  }

  ${el} .footer__filters li {
    display: inline;
  }

  ${el} .footer__filters li a {
    border-radius: 3px;
    border: 1px solid transparent;
    color: inherit;
    margin: 3px;
    padding: 3px 7px;
    text-decoration: none;
  }

  ${el} .footer__filters li a:hover {
    border-color: rgba(175, 47, 47, 0.1);
  }

  ${el} .footer__filters li a.selected {
    border-color: rgba(175, 47, 47, 0.2);
  }

  ${el} .todo__clear,
  ${el} .todo__clear:active {
    cursor: pointer;
    float: right;
    line-height: 20px;
    position: relative;
    text-decoration: none;
  }

  ${el} .todo__clear:hover {
    text-decoration: underline;
  }

  @media (max-width: 430px) {
    ${el} .footer__container {
      height: 50px;
    }

    ${el} .footer__filters {
      bottom: 10px;
    }
  }
`;

const cn = (filter, curr) => (filter === curr ? "selected" : "");

define("todo-footer", mixin(events, {
  style,
  props: {
    empty: true,
    filter: "all",
    remaining: 0,
    visible: false,
  },
  handleEvent() {
    this.emit("todos:clear-completed");
  },
  render() {
    const { empty, filter, remaining, visible } = this;

    this.html`
      <footer .hidden=${!visible} class="footer__container">
        <span class="footer__count">
          <strong>${remaining}</strong> item${~-remaining ? "s" : ""} left
        </span>
        <ul class="footer__filters">
          <li>
            <a class=${cn(filter, "all")} href="#/">
              All
            </a>
          </li>
          <li>
            <a class=${cn(filter, "active")} href="#/active">
              Active
            </a>
          </li>
          <li>
            <a class=${cn(filter, "completed")} href="#/completed">
              Completed
            </a>
          </li>
        </ul>
        <button .hidden=${empty} class="todo__clear" onclick=${this}>
          Clear completed
        </button>
      </footer>
    `;
  },
}));
