window.$ = document.querySelector.bind(document);
window.$$ = document.querySelectorAll.bind(document);

window.DOM = {
  create(content) {
    const el = document.createElement("div");
    el.innerHTML = content;
    return el.firstElementChild;
  },
};

if (!fp && _.noConflict) {
  window.fp = _.noConflict();
}

if (!Element.prototype.$) {
  Element.prototype.$ = Element.prototype.querySelector;
}

if (!Element.prototype.$$) {
  Element.prototype.$$ = Element.prototype.querySelectorAll;
}

if (!EventTarget.prototype.emit) {
  EventTarget.prototype.emit = function(name, detail) {
    this.dispatchEvent(
      new CustomEvent(name, {
        bubbles: true,
        detail,
      })
    );
  };
}

if (!EventTarget.prototype.on) {
  EventTarget.prototype.on = EventTarget.prototype.addEventListener;
}

if (!EventTarget.prototype.off) {
  EventTarget.prototype.off = EventTarget.prototype.removeEventListener;
}
