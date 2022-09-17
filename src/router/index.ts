import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Settings from "../views/Settings.vue"
import Queue from "../views/Queue.vue";
import History from "../views/History.vue"
import DownloadMod from '../views/Download.vue'
import DevSettings from '../views/DevSettings.vue'
import Donate from '../views/Donate.vue'
import PublicChat from '../views/PublicChat.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/chat/private/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/chat/private/queue",
    name: "queue",
    component: Queue,
  },
  {
    path: "/chat/private/history",
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
    path: "/chat/public/settings",
    name: "public",
    component: PublicChat,
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
  {
    path: "*",
    name: "notfound",
    component: NotFound
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

router.beforeEach((to, _1, next) => {
  if (to.name?.toLowerCase() === 'settings' || to.name?.toLowerCase() === "queue" || to?.name?.toLowerCase() === "history" || to?.name?.toLowerCase() === "public") {
    if (localStorage.getItem("auth")) {
      next();
    } else {
       next("/")
    }
  } else {
    next();
  }
})

export default router;
