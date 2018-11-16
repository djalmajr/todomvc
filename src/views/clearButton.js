export default (render, props) => {
  if (!props.completed.length) {
    return render`${[]}`;
  }

  return render`
    <button class="footer-clear" onclick=${props.onClear}>
      Clear completed
    </button>
  `;
};
