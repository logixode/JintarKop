import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Overview from "../views/Overview.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Notification from "../views/Notification.vue";
import Setting from "../views/Setting.vue";
import About from "../views/About.vue";

import * as firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/overview",
    name: "Overview",
    component: Overview
  },
  {
    path: "/register",
    name: "Tambah User Baru",
    component: Register
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      withoutAuth: true
    }
  },
  {
    path: "/notification",
    name: "Notifikasi",
    component: Notification
  },
  {
    path: "/setting",
    name: "Atur Alat",
    component: Setting
  },
  {
    path: "/about",
    name: "About",
    component: About
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const withoutAuth = to.matched.some(record => record.meta.withoutAuth);
  if (withoutAuth) {
    // to root
    next();
  }
  firebase.auth().onAuthStateChanged(user => {
    // console.log(user);
    // const user = firebase.auth().currentUser;
    if ((withoutAuth && !user) || (!withoutAuth && user)) {
      // to root
      next();
    } else if (withoutAuth && user) {
      next("/");
    } else next("/login");
  });
  // console.log(from);
});

export default router;
