import h from "hyperhtml";
import Router from "director";
import store from "../store";
import renderHeader from "./header";
import renderMain from "./main";
import renderFooter from "./footer";
import styles from "./app.less";

const router = new Router();
const routes = ["all", "active", "completed"];

routes.forEach(slug => router.on(slug, () => store.setFilter(slug)));
router.configure({ notfound: () => router.setRoute(filter) });
router.init("#/all");

export default () => h.wire()`
  <div class=${styles.container}>
    <section class=${styles.content}>
      ${renderHeader()}
      ${renderMain()}
      ${renderFooter()}
    </section>
    <footer class=${styles.info}>
			<p>Double-click to edit a todo</p>
			<p>Written by <a href="https://djalmajr.com">Djalma Jr.</a></p>
			<p>Not (yet 😆) part of <a href="http://todomvc.com">TodoMVC</a></p>
		</footer>
  </div>
`;
