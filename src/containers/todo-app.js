import { css, define, html } from "uce";
import { events, mixin, state } from "uce-mixins";
import { createCache, debounce } from "../helpers";
import { actions, ActionTypes, filterTodos } from "../store";

const todoCache = createCache("app-todos");

const getFilter = () => {
  const str = (window.location.hash.match(/\w+/g) || [])[0];
  return str !== "completed" && str !== "active" ? "all" : str;
};

const style = (el) => css`
  ${el} {
    color: #4d4d4d;
    display: block;
    font-weight: 300;
    font: 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
    line-height: 1.4em;
    margin: 0 auto;
    max-width: 550px;
    min-width: 230px;
  }

  ${el} .content {
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
    margin: 130px 0 40px;
    position: relative;
  }

  ${el} .info {
    margin: 65px auto 0;
    color: #bfbfbf;
    font-size: 12px;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
    text-align: center;
  }

  ${el} .info p {
    line-height: 1;
  }

  ${el} .info a {
    color: inherit;
    text-decoration: none;
    font-weight: 400;
  }

  ${el} .info a:hover {
    text-decoration: underline;
  }

  ${el} .todos {
    border-top: 1px solid #e6e6e6;
    position: relative;
    z-index: 2;
  }

  ${el} .todos ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

define("todo-app", mixin(events, state, {
  style,
  state: {
    filter: getFilter(),
    todos: todoCache.get(),
  },
  events: Object.values(ActionTypes),
  connected() {
    window.onhashchange = () => this.setState({ filter: getFilter() });
  },
  save({ todos }) {
    todoCache.set(todos);
  },
  handleEvent(evt) {
    switch (evt.type) {
      case ActionTypes.ADD:
      case ActionTypes.EDIT:
      case ActionTypes.REMOVE:
      case ActionTypes.TOGGLE:
        this.setState(actions[evt.type](evt.detail), this.save);
        break;
      case ActionTypes.CLEAR:
        this.setState(actions[ActionTypes.CLEAR], this.save);
        break;
      case ActionTypes.TOGGLE_ALL:
        this.setState(
          actions[ActionTypes.TOGGLE_ALL](this.state.filter),
          this.save
        );
        break;
    }
  },
  render() {
    const { filter, todos } = this.state;
    const filtered = filterTodos(filter, todos);
    const completed = filterTodos("completed", todos);
    const incompleted = filterTodos("active", todos);

    this.html`
      <section class="content">
        <todo-header
          .allDone=${filtered.every((t) => t.completed)}
          .showCheck=${!!filtered.length}
        />
        <section class="todos">
          <ul>
            ${filtered.map(
              (todo) => html`
                <li>
                  <todo-item class=${todo.uid} .todo=${todo} />
                </li>
              `
            )}
          </ul>
        </section>
        <todo-footer
          .filter=${filter}
          .visible=${!!Object.keys(todos).length}
          .remaining=${incompleted.length}
          .empty=${!completed.length}
        />
      </section>
      <footer class="info">
        <p>Double-click to edit a todo</p>
        <p>Written by <a href="https://djalmajr.com">Djalma Jr.</a></p>
        <p>Not part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    `;
  },
}));
