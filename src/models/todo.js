class Todo {
  constructor(todo) {
    this.text = todo.text || "";
    this.completed = !!todo.completed;
    this.uid = todo.uid || new Date().toJSON().replace(/[^\w]/g, "");
  }

  update(data) {
    for (const key in data) {
      this[key] = data[key];
    }
  }

  toggle() {
    this.completed = !this.completed;
  }
}

export default Todo;
