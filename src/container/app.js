import { wire } from "hyperhtml";
import Router from "director";
import store from "../store";
import Header from "./header";
import Todos from "./todos";
import Footer from "./footer";
import styles from "./app.less";

const router = new Router();
const routes = store.filters.map(filter => filter.toLowerCase());

routes.forEach(slug => router.on(slug, () => store.setFilter(slug)));
router.configure({ notfound: () => router.setRoute(routes[0]) });
router.init(`#/${routes[0]}`);

export default () => wire()`
  <div class=${styles.container}>
    <section class=${styles.content}>
      ${new Header()}
      ${new Todos()}
      ${new Footer()}
    </section>
    <footer class=${styles.info}>
			<p>Double-click to edit a todo</p>
			<p>Written by <a href="https://djalmajr.com">Djalma Jr.</a></p>
			<p>Not (yet 😆) part of <a href="http://todomvc.com">TodoMVC</a></p>
		</footer>
  </div>
`;
