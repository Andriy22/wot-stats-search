import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Settings from "../views/Settings.vue"
import Queue from "../views/Queue.vue";
import History from "../views/History.vue"
import DownloadMod from '../views/Download.vue'
import DevSettings from '../views/DevSettings.vue'
import Donate from '../views/Donate.vue'

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/queue",
    name: "queue",
    component: Queue,
  },
  {
    path: "/history",
    name: "history",
    component: History,
  },
  {
    path: "/download",
    name: "download",
    component: DownloadMod,
  },
  {
    path: "/dev/settings",
    name: "DevSettings",
    component: DevSettings,
  },
  {
    path: "/donate",
    name: "donate",
    component: Donate,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, _1, next) => {
  if (to.path.toLowerCase() === '/settings' || to.path.toLowerCase() === "/queue" || to.path.toLowerCase() === "/history") {
    if (localStorage.getItem("auth")) {
      next();
    } else {
        return  "/";
    }
  } else {
    next();
  }
})

export default router;
