import storage from "../utils/storage";
import Todo from "../models/todo";

class Controller {
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
    this.todos = storage.get().map(t => new Todo(t));

    this.update = () => {
      render(this.filtered);
      storage.set(this.todos);
    };

    window.onhashchange = this.update;
  }

  // Actions

  add(text) {
    this.todos.push(new Todo({ text }));
    this.update();
  }

  clear() {
    this.todos = this.todos.filter(t => !t.completed);
    this.update();
  }

  edit(uid, text) {
    this.todos[this.indexOf(uid)].update({ text });
    this.update();
  }

  remove(uid) {
    this.todos.splice(this.indexOf(uid), 1);
    this.update();
  }

  toggle(uid) {
    this.todos[this.indexOf(uid)].toggle();
    this.update();
  }

  toggleAll() {
    const completed = !this.allDone;

    for (const todo of this.todos) {
      todo.update({ completed });
    }

    this.update();
  }
}

export default new Controller();
