import Base from "./base.js";
import storage from "../utils/storage.js";
import Todo from "../models/todo.js";

class Controller extends Base {
  constructor() {
    super();
    this.filters = ["all", "active", "completed"];
    this.todos = storage.get().map(t => new Todo(t));
  }

  get hash() {
    const str = (location.hash.match(/\w+/g) || [])[0];
    return str !== "completed" && str !== "active" ? "all" : str;
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

  indexOf(uid) {
    return this.todos.findIndex(t => t.uid === uid);
  }

  filter(f) {
    return (
      (f === "all" && this.todos) ||
      this.todos.filter(f === "active" ? t => !t.completed : t => t.completed)
    );
  }

  init(render) {
    this.update = () => {
      render(this);
      storage.set(this.todos);
    };

    window.onhashchange = this.update;
  }

  // Actions

  onAdd(evt) {
    const text = evt.target.value.trim();

    if (evt.key === "Enter" && text) {
      evt.target.value = "";
      this.todos.push(new Todo({ text }));
      this.update();
    }
  }

  onClear() {
    this.todos = this.todos.filter(t => !t.completed);
    this.update();
  }

  onEdit(evt) {
    const text = evt.target.value.trim();
    const uid = evt.target.closest("li").dataset.uid;
    this.todos[this.indexOf(uid)].update({ text });
    this.update();
  }

  onRemove(evt) {
    const uid = evt.target.closest("li").dataset.uid;
    this.todos.splice(this.indexOf(uid), 1);
    this.update();
  }

  toggle(uid) {
    const idx = this.indexOf(uid);
    this.todos[idx].toggle();
    window.emit("todo:changed", this.todos[idx]);
  }

  onToggleAll() {
    const completed = !this.allDone;

    for (const todo of this.todos) {
      todo.update({ completed });
    }

    this.update();
  }
}

export default new Controller();
