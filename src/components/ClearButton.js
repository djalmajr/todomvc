const handleClear = props => () => props.onClear();

export default (render, props) => {
  if (!props.completed.length) {
    return render`${[]}`;
  }

  return render`
    <button class="clear-button" onclick=${handleClear(props)}>
      Clear completed
    </button>
  `;
};
