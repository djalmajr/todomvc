import cleanCRLF from "./cleanCRLF";
import filterNodes from "./filterNodes";

const SECRET = "🚀";

const endsWithAttr = (str) => /.*<([a-zA-Z-]+).*\s(.*)=["']?$/.test(str);

const filterByAttr = (node) => {
  return node.nodeType === Node.ELEMENT_NODE
    ? node
        .getAttributeNames()
        .filter((attr) => node.getAttribute(attr) === SECRET)
    : [];
};

const getNodes = (root) => {
  return filterNodes(root, null, (node) => {
    return node.nodeType === Node.COMMENT_NODE
      ? RegExp(SECRET).test(node.textContent)
      : filterByAttr(node).length;
  });
};

export default function html(chunks, ...values) {
  const tpl = document.createElement("template");

  tpl.innerHTML = values.reduce((res, _val, idx) => {
    const next = cleanCRLF(chunks[idx + 1]);

    if (!endsWithAttr(res)) {
      return `${res}<!--${SECRET}-->${next}`;
    }

    const data = res.slice(-1) === "=" ? `"${SECRET}"` : SECRET;

    return res + data + next;
  }, cleanCRLF(chunks[0]));

  const paths = getNodes(tpl.content)
    .map((node) => {
      const path = [];
      const attrs = filterByAttr(node) || [];

      if (!attrs.length) {
        const newNode = document.createTextNode("");
        node.parentNode.replaceChild(newNode, node);
        node = newNode;
      }

      do {
        path.unshift(path.indexOf.call(node.parentNode.childNodes, node));
        node = node.parentNode;
      } while (node !== tpl.content);

      return attrs.length
        ? attrs.map((attr) => path.concat(attr))
        : [path.concat("")];
    })
    .reduce((res, arr) => res.concat(arr), []);

  const updates = paths.map((path) => {
    const attr = path.slice(-1)[0];
    const node = path
      .slice(0, -1)
      .reduce((p, i) => p.childNodes[i], tpl.content);

    return (val) => {
      if (attr) {
        node.removeAttribute(attr);

        switch (attr[0]) {
          case "@":
          case ".": {
            const prefix = attr[0] === "@" ? "on" : "";
            node[prefix + attr.slice(1)] = val;
            break;
          }
          case "?": {
            const action = val ? "set" : "remove";
            node[`${action}Attribute`](attr.slice(1), val === true ? "" : val);
            break;
          }
          default: {
            node.setAttribute(attr, String(val));
            break;
          }
        }
      } else {
        const arr = [].concat(val);

        if (arr[0] instanceof DocumentFragment) {
          arr.forEach((n) => node.parentNode.insertBefore(n, node));
        } else {
          node.textContent = arr.map(String).join("");
        }
      }
    };
  });

  updates.forEach((fn, i) => fn(values[i]));

  return tpl.content;
}
