export function $(query, recursive = false, container = document) {
  const fn = recursive ? 'querySelectorAll' : 'querySelector';
  const validator = recursive ? (el) => el.length : (el) => el;
  const element = container[fn](query);

  if (validator(element) || container === document) {
    return element;
  }

  return $(query, container.host.getRootNode(), recursive);
}

export function emit(ctx, name, data) {
  ctx.dispatchEvent(
    new CustomEvent(name, {
      bubbles: true,
      composed: true,
      detail: data,
    })
  );
}

export function on(el, evtName, callback) {
  const names = evtName.split(/[\s,]/g).filter(Boolean);

  for (const name of names) {
    el.addEventListener(name, callback);
  }
}

export function off(el, evtName, callback) {
  const names = evtName.split(/[\s,]/g).filter(Boolean);

  for (const name of names) {
    el.removeEventListener(name, callback);
  }
}
