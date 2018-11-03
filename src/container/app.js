import h from "hyperhtml";
import Router from "director";
import store from "../store";
import renderHeader from "./header";
import renderTodos from "./todos";
import renderFooter from "./footer";
import styles from "./app.less";

const router = new Router();
const routes = ["all", "active", "completed"];

routes.forEach(slug => router.on(slug, () => store.setFilter(slug)));
router.configure({ notfound: () => router.setRoute(filter) });
router.init("#/all");

export default () => h.wire()`
  <div class="${styles.container}">
    <div class="${styles.content}">
      ${renderHeader()}
      ${renderFooter()}
    </div>
  </div>
`;
