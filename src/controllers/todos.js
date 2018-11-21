import debounce from "../utils/debounce.js";
import Todo from "../models/Todo.js";

const KEY = "app-todos";

const storage = {
  get: () => JSON.parse(localStorage.getItem(KEY) || "[]"),
  set: debounce(t => localStorage.setItem(KEY, JSON.stringify(t)), 500),
};

class Controller {
  constructor() {
    const cached = storage.get();

    this.todos = Object.keys(cached).reduce((res, uid) => {
      return (res[uid] = new Todo(cached[uid])), res;
    }, {});
  }

  get hash() {
    const str = (location.hash.match(/\w+/g) || [])[0];
    return str !== "completed" && str !== "active" ? "all" : str;
  }

  get all() {
    return this.filter("all");
  }

  get incompleted() {
    return this.filter("active");
  }

  get completed() {
    return this.filter("completed");
  }

  get filtered() {
    return this.filter(this.hash);
  }

  get allDone() {
    return this.filtered.every(t => t.completed);
  }

  filter(filter) {
    const todos = Object.keys(this.todos).map(uid => this.todos[uid]);

    if (filter === "all") {
      return todos;
    }

    return todos.filter(filter === "active" ? t => !t.completed : t => t.completed);
  }

  init(render) {
    this.update = () => {
      render(this);
      storage.set(this.todos);
    };

    window.onhashchange = this.update;
  }

  // Actions

  onAdd(text) {
    const todo = new Todo({ text });
    this.todos[todo.uid] = todo;
    this.update();
  }

  onClear() {
    for (const uid in this.todos) {
      if (this.todos[uid].completed) {
        delete this.todos[uid];
      }
    }

    this.update();
  }

  onEdit({ uid, text }) {
    this.todos[uid].update({ text });
    this.update();
  }

  onRemove(uid) {
    delete this.todos[uid];
    this.update();
  }

  onToggle(uid) {
    this.todos[uid].toggle();
    this.update();
  }

  onToggleAll() {
    const completed = !this.allDone;

    for (const uid in this.todos) {
      this.todos[uid].update({ completed });
    }

    this.update();
  }
}

export default new Controller();
