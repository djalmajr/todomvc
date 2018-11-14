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

function handleKeyUp(controller, evt) {
  const text = evt.target.value.trim();
  const li = evt.target.closest("li");

  if (evt.key === "Enter" && text) {
    li.classList.remove("editing");
    controller.onEdit(evt);
  } else if (evt.key === "Escape") {
    li.classList.remove("editing");
  }
}

export default (render, controller) => {
  return render`
    <section class="todos">
      <ul>
        ${controller.filtered.map(
          todo => wire(todo)`
            <li data-uid=${todo.uid} class=${`todo${todo.completed ? " completed" : ""}`}>
              <div class="view">
                <input
                  type="checkbox"
                  class="toggle"
                  checked=${todo.completed}
                  onchange=${controller.onToggle}
                />
                <label ondblclick=${handleDblClick}>${todo.text}</label>
                <button class="destroy" onclick=${controller.onRemove} />
              </div>
              <input
                class="edit"
                value=${todo.text}
                onblur=${handleBlur.bind(null, todo)}
                onkeyup=${handleKeyUp.bind(null, controller)}
              />
            </li>
          `
        )}
      </ul>
    </section>
  `;
};
