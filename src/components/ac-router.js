import {
  component,
  createContext,
  html,
  useContext,
  useEffect,
  useState,
} from "https://unpkg.com/haunted/haunted.js";
import {
  querySelectorAllDeep,
  querySelectorDeep,
} from "https://unpkg.com/query-selector-shadow-dom";
import { find } from "../helpers/collection.js";
import { curryN } from "../helpers/function.js";

const compare = curryN(2, (slug, path = "") => {
  return slug.match(new RegExp(`^${path}$`, "g")) || getParams(path);
});

export const getSlug = () => {
  const { hash } = window.location;
  return hash ? hash.replace(/^\/?#\/?(.*?)\/?$/g, "/$1") : "/";
};

export const getParams = (path) => {
  const args = path.match(/{(.+?)}/g);

  if (args) {
    const found = getSlug().match(
      new RegExp(path.replace(/{(.+?)}/g, "([\\w-]+)"))
    );

    if (found) {
      const pars = found.slice(1, 1 + args.length);

      // prettier-ignore
      return args.reduce((res, arg, i) => Object.assign(res, {
        [arg.replace(/([{}])/g, "")]: pars[i]
      }), {});
    }
  }

  return null;
};

export const getRouteProps = () => {
  const routes = querySelectorAllDeep("ac-route");
  const route = { slug: getSlug() };

  if (routes.length) {
    const compare = (match = "") => {
      if (match === "*") return false;

      const params = getParams(match);
      const result = route.slug.match(new RegExp(`^${match}$`, "g")) || params;

      result && (route.match = match);
      params && (route.params = params);

      return result;
    };

    for (const r of routes) {
      if ([].concat(r.match).some(compare)) {
        break;
      }
    }

    if (!route.match && find({ match: "*" }, routes)) {
      route.match = "*";
    }
  }

  return route;
};

const Context = createContext({ slug: getSlug() });

export const useRouter = () => useContext(Context);

function Route({ match, redirect, render }) {
  const route = useRouter();

  useEffect(() => {
    const router = querySelectorDeep("ac-router");

    if (!router) {
      console.error("Place the route inside a <ac-router>");
    }
  }, []);

  if (match === "*") {
    if (route.match !== "*") return "";
  } else if (!match || ![].concat(match).some(compare(route.slug))) {
    return "";
  }

  if (redirect) {
    window.location.hash = redirect;
    return "";
  }

  return render
    ? html`<ac-router-consumer .render=${render}></ac-router-consumer>`
    : html`<slot></slot>`;
}

Route.observedAttributes = ["match", "redirect"];

function Router({ render }) {
  const [route, setRoute] = useState({ slug: getSlug() });
  const changeRoute = () => setRoute(getRouteProps());

  window.onhashchange = changeRoute;

  useEffect(() => {
    const instances = querySelectorAllDeep("ac-router");

    if (instances.length > 1) {
      console.error("Only one declaration of <ac-router> is allowed");
    }

    setTimeout(changeRoute);
  }, []);

  return html`
    <ac-router-provider .value=${route}>
      ${render
        ? html`<ac-router-consumer .render=${render}></ac-router-consumer>`
        : html`<slot></slot>`}
    </ac-router-provider>
  `;
}

if (!customElements.get("ac-router-provider")) {
  customElements.define("ac-router-consumer", Context.Consumer);
  customElements.define("ac-router-provider", Context.Provider);
}

if (!customElements.get("ac-route")) {
  customElements.define("ac-route", component(Route));
}

if (!customElements.get("ac-router")) {
  customElements.define("ac-router", component(Router));
}
