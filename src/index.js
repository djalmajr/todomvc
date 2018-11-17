import app from "./views/app.js";

const wrapper = $("#__wrapper__");
wrapper.innerHTML = "";
wrapper.append(app());
