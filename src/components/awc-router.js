import { html, useContext } from "https://unpkg.com/haunted/haunted.js";
import { RouterContext } from "../contexts/router.js";
import { curryN } from "../helpers/curryN.js";
import { getParams } from "../helpers/route.js";

const compare = curryN(2, (slug, path = "") => {
  return slug.match(new RegExp(`^${path}$`, "g")) || getParams(path);
});

export function Route({ match }) {
  const ctx = useContext(RouterContext);

  if (match === "*") {
    if (ctx.match !== "*") return "";
  } else if (!match || ![].concat(match).some(compare(ctx.slug))) {
    return "";
  }

  // prettier-ignore
  return html`<slot></slot>`;
}

Route.observedAttributes = ["match"];
