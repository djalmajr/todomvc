const { wire } = hyperHTML;

const handleBlur = todo => evt => {
  const li = evt.target.closest("li");
  li.classList.remove("editing");
  evt.target.value = todo.text;
};

const handleDblClick = evt => {
  const li = evt.target.closest("li");
  li.classList.add("editing");
  li.querySelector(".edit").select();
};

const handleKeyUp = props => evt => {
  const text = evt.target.value.trim();
  const li = evt.target.closest("li");

  if (evt.key === "Enter" && text) {
    li.classList.remove("editing");
    props.onEdit({ text, uid: li.dataset.uid });
  } else if (evt.key === "Escape") {
    li.classList.remove("editing");
  }
};

const handleRemove = props => evt => {
  props.onRemove(evt.target.closest("li").dataset.uid);
};

const handleToggle = props => evt => {
  props.onToggle(evt.target.closest("li").dataset.uid);
};

export default (todo, props) => wire(todo)`
  <li
    data-uid=${todo.uid}
    class=${`todo${todo.completed ? " completed" : ""}`}
  >
    <div class="view">
      <input
        type="checkbox"
        class="toggle"
        checked=${todo.completed}
        onchange=${handleToggle(props)}
      />
      <label ondblclick=${handleDblClick}>${todo.text}</label>
      <button
        class="destroy"
        onclick=${handleRemove(props)}
      />
    </div>
    <input
      class="edit"
      value=${todo.text}
      onblur=${handleBlur(todo)}
      onkeyup=${handleKeyUp(props)}
    />
  </li>
`;
