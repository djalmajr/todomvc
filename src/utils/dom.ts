import { component } from 'haunted';

type Listener = EventListenerOrEventListenerObject;

export function emit(ctx: Element, name: string, data?: unknown) {
  ctx.dispatchEvent(
    new CustomEvent(name, {
      bubbles: true,
      composed: !!ctx.shadowRoot,
      detail: data,
    })
  );
}

export function on(el: EventTarget, evtName: string, callback: Listener) {
  const names = evtName.split(/[\s,]/g).filter(Boolean);

  for (const name of names) {
    el.addEventListener(name, callback);
  }
}

export function off(el: EventTarget, evtName: string, callback: Listener) {
  const names = evtName.split(/[\s,]/g).filter(Boolean);

  for (const name of names) {
    el.removeEventListener(name, callback);
  }
}

export function define(name: string, element: any, options?: any) {
  if (!customElements.get(name)) {
    customElements.define(name, component(element), options);
  }
}
