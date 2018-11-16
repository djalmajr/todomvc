const { wire } = hyperHTML;

function handleBlur(todo, evt) {
  const li = evt.target.closest("li");
  li.classList.remove("editing");
  evt.target.value = todo.text;
}

function handleDblClick(evt) {
  const li = evt.target.closest("li");
  li.classList.add("editing");
  li.querySelector(".edit").select();
}

function handleKeyUp(props, evt) {
  const text = evt.target.value.trim();
  const li = evt.target.closest("li");

  if (evt.key === "Enter" && text) {
    li.classList.remove("editing");
    props.onEdit(evt);
  } else if (evt.key === "Escape") {
    li.classList.remove("editing");
  }
}

export default (render, props) => {
  return render`
    <section class="todos">
      <ul>
        ${props.filtered.map(
          todo => wire(todo)`
            <li data-uid=${todo.uid} class=${`todo${todo.completed ? " completed" : ""}`}>
              <div class="view">
                <input
                  type="checkbox"
                  class="toggle"
                  checked=${todo.completed}
                  onchange=${props.onToggle}
                />
                <label ondblclick=${handleDblClick}>${todo.text}</label>
                <button class="destroy" onclick=${props.onRemove} />
              </div>
              <input
                class="edit"
                value=${todo.text}
                onblur=${handleBlur.bind(null, todo)}
                onkeyup=${handleKeyUp.bind(null, props)}
              />
            </li>
          `
        )}
      </ul>
    </section>
  `;
};
