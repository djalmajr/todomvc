import Todo from "../models/todo.js";

const KEY = "app-todos";

const arr2obj = (a, k = "uid") => _.fromPairs(_.map(a, d => [d[k], d]));
// const arr2obj = (a, k = "uid") => a.reduce((o, d) => (o[d[k]] = d, o), {});

const storage = {
  get: () => JSON.parse(localStorage.getItem(KEY) || "{}"),
  set: _.debounce(t => localStorage.setItem(KEY, JSON.stringify(t)), 500),
};

class Controller {
  constructor() {
    this.on = (...args) => $(window).on(...args);
    this.off = (...args) => $(window).off(...args);
    this.emit = (...args) => $(window).trigger(...args);

    this.filters = ["all", "active", "completed"];
    this.todos = fp.reduce((res, val) =>
      fp.merge(res, {
        [val.uid]: new Todo(val),
      })
    )({}, storage.get());

    window.onhashchange = () => this.emit("todos:changed");
    this.on("todos:changed", () => storage.set(this.todos));
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
    return _.map(this.filter(this.hash), _.identity);
  }

  get all() {
    return _.map(this.todos, _.identity);
  }

  get allDone() {
    return _.every(this.filtered, { completed: true });
  }

  filter(f) {
    return (
      (f === "all" && this.todos) ||
      _.filter(this.todos, { completed: f !== "active" })
    );
  }

  // Actions

  add(text) {
    const todo = new Todo({ text });
    this.todos[todo.uid] = todo;
    this.emit("todos:changed");
  }

  clear() {
    this.todos = arr2obj(_.filter(this.todos, { completed: false }));
    this.emit("todos:changed");
  }

  edit({ uid, text }) {
    this.todos[uid].update({ text });
    this.emit("todos:changed");
  }

  remove(uid) {
    delete this.todos[uid];
    this.emit("todos:changed");
  }

  toggle(uid) {
    this.todos[uid].toggle();
    this.emit("todos:changed");
  }

  toggleAll() {
    const completed = !this.allDone;
    _.forEach(this.todos, t => t.update({ completed }));
    this.emit("todos:changed");
  }
}

export default new Controller();
