import { createApp } from "./core/index.js";
import { App } from "./app.js";

console.log(createApp("./app.js"));
createApp(App).mount(document.querySelector("#app"));