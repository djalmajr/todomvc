import { component as $ } from "https://unpkg.com/haunted/haunted.js";

// type Listener = EventListenerOrEventListenerObject;

export function emit(ctx, name, data) {
  ctx.dispatchEvent(
    new CustomEvent(name, {
      bubbles: true,
      composed: !!ctx.shadowRoot,
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

export function define(name, element, options) {
  if (!customElements.get(name)) {
    const isBool = typeof options === "boolean";
    const el = isBool ? element : $(element);
    customElements.define(name, el, isBool ? {} : options);
  }
}
