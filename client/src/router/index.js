import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login";
import Register from "../views/Register";

import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    meta: { requiresAuth: true },
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    meta: { requiresVisitor: true },
    props: true,
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    meta: { auth: false },
    component: Register,
    meta: { requiresVisitor: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.loggIn) {
      next({
        path: "/login",
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
    if (store.getters.loggIn) {
      next({
        path: "/home",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
