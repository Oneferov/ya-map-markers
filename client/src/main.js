import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import VueAxios from "vue-axios";
import YmapPlugin from "vue-yandex-maps";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueAxios, axios);

Vue.use(YmapPlugin, {
  apiKey: "27eee2d0-1e45-4a9f-9ec5-d872564386d9",
  lang: "ru_RU",
  coordorder: "latlong",
  version: "2.1",
});

Vue.prototype.$eventBus = new Vue();

const config = {
  baseURL: "http://127.0.0.1:8000/api",
};

const authInterceptor = (config) => {
  const authToken = localStorage.getItem("token");
  config.headers.Authorization = authToken;
  return config;
};

axios.interceptors.request.use(authInterceptor);

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response.status === 401) {
      store.dispatch("destroyToken");
      router.push({
        name: "Login",
        params: {
          message: "Срок действия токена истек, пожалуйста авторизуйтесь!",
        },
      });
    }
    return Promise.reject(error);
  }
);

new Vue({
  router,
  axios,
  store,
  render: (h) => h(App),
}).$mount("#app");
