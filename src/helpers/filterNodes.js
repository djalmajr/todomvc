export default function filterNodes(root, type, filter) {
  const result = [];
  const nodes = document.createTreeWalker(root, type || NodeFilter.SHOW_ALL);

  // eslint-disable-next-line no-cond-assign
  for (let node; (node = nodes.nextNode()); ) {
    if ((filter || (() => true))(node)) result.push(node);
  }

  return result;
}
