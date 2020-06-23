import { querySelectorAllDeep } from "https://unpkg.com/query-selector-shadow-dom";
import { find } from "./collection.js";

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
  const routes = querySelectorAllDeep("awc-route");
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
