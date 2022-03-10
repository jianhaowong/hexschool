// 套件引入都放這

import { createApp } from "vue";

import "bootstrap";
// axios套件引入
import axios from "axios";
import VueAxios from "vue-axios";

import App from "./App.vue";
import router from "./router";

createApp(App).use(router).use(VueAxios, axios).mount("#app");
