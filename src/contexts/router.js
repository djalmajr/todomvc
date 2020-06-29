import { createContext } from "https://unpkg.com/haunted/haunted.js";
import { getSlug } from "../helpers/router.js";

export const RouterContext = createContext({ slug: getSlug() });

if (!customElements.get("ac-router-provider")) {
  customElements.define("ac-router-consumer", RouterContext.Consumer);
  customElements.define("ac-router-provider", RouterContext.Provider);
}
