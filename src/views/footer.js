import ClearButton from "./clearButton.js";

const button = hyperHTML.wire();
const cn = (hash, curr) => (hash === curr ? "selected" : "");

export default (render, props) => {
  const { hash, incompleted, todos } = props;
  const left = incompleted.length;

  if (!todos.length) {
    return render`${[]}`;
  }

  return render`
    <footer class="footer-container">
      <span class="footer-count">
        <strong>${left}</strong> item${~-left ? "s" : ""} left
      </span>
      <ul class="footer-filters">
        <li><a class="${cn(hash, "all")}" href="#/all">All</a></li>
        <li><a class="${cn(hash, "active")}" href="#/active">Active</a></li>
        <li><a class="${cn(hash, "completed")}" href="#/completed">Completed</a></li>
      </ul>
      ${ClearButton(button, props)}
    </footer>
  `;
};
