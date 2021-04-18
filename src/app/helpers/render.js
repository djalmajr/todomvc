export default function (wrapper, node) {
  wrapper.replaceChildren(...node.children);
}
