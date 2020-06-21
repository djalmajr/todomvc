import { createContext, useContext } from 'haunted';

const { assign } = Object;

export const getSlug = () => {
  const { hash } = window.location;
  return hash ? hash.replace(/^\/?#\/?(.*?)\/?$/g, '/$1') : '/';
};

export const getParams = (path: string) => {
  const args = path.match(/{(.+?)}/g);

  if (args) {
    const found = getSlug().match(
      new RegExp(path.replace(/{(.+?)}/g, '(\\w+)'))
    );

    if (found) {
      const pars = found.slice(1, 1 + args.length);

      // prettier-ignore
      return args.reduce((res, arg, i) => assign(res, {
        [arg.replace(/([{}])/g, "")]: pars[i]
      }), {});
    }
  }

  return {};
};

export const RouterContext = createContext('');

export const Route = function ({
  children,
  component,
  match,
  render,
  ...props
}) {
  const slug = useContext(RouterContext);
  const route = { slug };

  if (match) {
    const compare = (path = '') => {
      const params = getParams(path);
      const result = slug.match(new RegExp(`^${path}$`, 'g')) || params;

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
