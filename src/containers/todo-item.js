import { css, define } from "uce";
import { events, mixin } from "uce-mixins";
import { classNames as cn } from "../helpers";

const style = (el) => css`
  ${el} {
    font: 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 300;
    line-height: 1.4em;
  }

  ${el} .todo {
    border-bottom: 1px solid #ededed;
    font-size: 24px;
    position: relative;
  }

  ${el} .todo:last-child {
    border-bottom: none;
  }

  ${el} .todo label {
    display: block;
    line-height: 1.2;
    padding: 15px 15px 15px 60px;
    transition: color 0.4s;
    word-break: break-all;
  }

  ${el} .todo--completed label {
    color: #d9d9d9;
    text-decoration: line-through;
  }

  ${el} .todo:hover .todo__destroy {
    display: block;
  }

  ${el} .todo--editing {
    border-bottom: none;
    padding: 0;
  }

  ${el} .todo--editing:last-child {
    margin-bottom: -1px;
  }

  ${el} .todo--editing .todo__edit {
    border: none;
    display: block;
    margin: 0 0 0 43px;
    padding: 12px 16px;
    width: calc(100% - 43px);
  }

  ${el} .todo--editing .todo__view {
    display: none;
  }

  ${el} .todo__edit {
    display: none;
  }

  ${el} .todo__toggle {
    appearance: none;
    border: none;
    bottom: 0;
    cursor: pointer;
    height: 40px;
    margin: auto 0;
    opacity: 0;
    position: absolute;
    text-align: center;
    top: 0;
    width: 40px;
  }

  ${el} .todo__toggle + label {
    background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center left;
  }

  ${el} .todo__toggle:checked + label {
    background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
  }

  ${el} .todo__destroy {
    background: none;
    border: none;
    bottom: 0;
    color: #cc9a9a;
    display: none;
    font-size: 30px;
    height: 40px;
    margin: auto 0;
    position: absolute;
    right: 10px;
    top: 0;
    transition: color 0.2s ease-out;
    width: 40px;
  }

  ${el} .todo__destroy:hover {
    color: #af5b5e;
  }

  ${el} .todo__destroy:after {
    content: "×";
  }

  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    ${el} .todo__toggle {
      background: none;
      height: 40px;
    }
  }
`;

define("todo-item", mixin(events, {
  style,
  inputRef: {},
  props: {
    editing: false,
    todo: {},
  },
  handleDblClick() {
    this.editing = true;
    setTimeout(() => this.inputRef.current.select());
  },
  handleKeyUp(evt) {
    const text = evt.target.value.trim();

    if (evt.key === "Enter" && text) {
      this.editing = false;
      this.emit("todos:edit", { ...this.todo, text });
    } else if (evt.key === "Escape") {
      this.editing = false;
    }
  },
  render() {
    const { editing, todo } = this;

    this.html`
      <div
        class=${cn(
          "todo",
          todo.completed && "todo--completed",
          editing && "todo--editing"
        )}
      >
        <div class="todo__view">
          <input
            type="checkbox"
            class="todo__toggle"
            .checked=${todo.completed}
            onchange=${() => this.emit("todos:toggle", todo)}
          />
          <label ondblclick=${this.handleDblClick}>
            ${todo.text}
          </label>
          <button
            class="todo__destroy"
            onclick=${() => this.emit("todos:remove", todo)}
          />
        </div>
        <input
          ref=${this.inputRef}
          class="todo__edit"
          .value=${todo.text}
          onblur=${() => (this.editing = false)}
          onkeyup=${this.handleKeyUp}
        />
      </div>
    `;
  },
}));
