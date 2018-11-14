export default class {
  constructor() {
    const proto = this.constructor.prototype;
    const methods = Object.getOwnPropertyNames(proto)
      .filter(prop => prop.match(/^(on|handle).*/g))
      .filter(prop => typeof proto[prop] === "function");

    this.bindAll(methods);
  }

  bindAll(methods) {
    if (methods.length > 0) {
      const proto = this.constructor.prototype;

      for (let i = 0, p; (p = methods[i]); i++) {
        proto[p] = proto[p].bind(this);
      }
    }
  }
}
