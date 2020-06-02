import React from "react";

const { assign } = Object;

/**
 * @returns {string} the url slug
 */
const getSlug = () => {
  const { hash } = window.location;
  return hash ? hash.replace(/^\/?#\/?(.*?)\/?$/g, "/$1") : "/";
};

/**
 * @example
 *
 * const params = getParams('/posts/{{id}}');
 * console.log(params); // logs { id: 1 }
 *
 * @param {string} path
 * @returns {Record<string, string>} params
 */
const getParams = (path) => {
  const args = path.match(/{(.+?)}/g);

  if (args) {
    const found = getSlug().match(
      new RegExp(path.replace(/{(.+?)}/g, "(\\w+)"))
    );

    if (found) {
      const pars = found.slice(1, 1 + args.length);

      // prettier-ignore
      return args.reduce((res, arg, i) => assign(res, {
        [arg.replace(/([{}])/g, "")]: pars[i]
      }), {});
    }
  }
};

const Context = React.createContext();

export const Router = ({ children }) => {
  const [slug, setSlug] = React.useState(getSlug());
  window.onhashchange = () => setSlug(getSlug());
  return <Context.Provider value={slug}>{children}</Context.Provider>;
};

export const Route = function ({
  children,
  component,
  match,
  render,
  ...props
}) {
  const slug = React.useContext(Context);
  const route = { slug };

  if (match) {
    const compare = (path = "") => {
      const params = getParams(path);
      const result = slug.match(new RegExp(`^${path}$`, "g")) || params;

      params && (route.params = params);
      result && (route.match = path);

      return result;
    };

    if (![].concat(match).some(compare)) {
      return null;
    }
  }

  return React.createElement(
    children || component || render,
    assign(props, { route })
  );
};
