import {
  component,
  html,
  useContext,
  useEffect,
  useState,
} from "https://unpkg.com/haunted/haunted.js";
import {
  querySelectorAllDeep,
  querySelectorDeep,
} from "https://unpkg.com/query-selector-shadow-dom";
import { RouterContext } from "../contexts/router.js";
import { curryN } from "../helpers/curryN.js";
import { getParams, getRouteProps, getSlug } from "../helpers/router.js";

const compare = curryN(2, (slug, path = "") => {
  return slug.match(new RegExp(`^${path}$`, "g")) || getParams(path);
});

function Route({ match }) {
  const ctx = useContext(RouterContext);

  useEffect(() => {
    const router = querySelectorDeep("ac-router");

    if (!router) {
      console.error("Place the route inside a <ac-router>");
    }

    console.log(router);
  }, []);

  if (match === "*") {
    if (ctx.match !== "*") return "";
  } else if (!match || ![].concat(match).some(compare(ctx.slug))) {
    return "";
  }

  return html`<slot></slot>`;
}

Route.observedAttributes = ["match"];

function Router() {
  const [route, setRoute] = useState({ slug: getSlug() });

  window.onhashchange = () => setRoute(getRouteProps());

  this.register = () => {
    this.routes = this.routes || {};
  };

  useEffect(() => {
    const instances = querySelectorAllDeep("ac-router");

    if (instances.length > 1) {
      console.error("Only one declaration of <ac-router> is allowed");
    }

    setTimeout(() => setRoute(getRouteProps()));
  }, []);

  return html`
    <ac-router-provider .value=${route}>
      <slot></slot>
    </ac-router-provider>
  `;
}

if (!customElements.get("ac-route")) {
  customElements.define("ac-route", component(Route));
}

if (!customElements.get("ac-router")) {
  customElements.define("ac-router", component(Router));
}
