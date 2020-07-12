<template>
  <v-app class="red">
    <v-app-bar app dark color="#FDAE20" v-if="showAppBar">
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->

      <v-btn icon large v-if="showBackButton" @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <!-- <v-spacer /> -->
      <v-toolbar-title>{{ routeName }}</v-toolbar-title>
      <v-spacer />

      <!-- <v-btn icon>
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>-->
    </v-app-bar>

    <v-content>
      <router-view />
      <!-- <HelloWorld /> -->
    </v-content>

    <v-bottom-navigation
      app
      :value="activeBtn"
      grow
      elevation="24"
      color="orange"
      v-if="showBottomBar"
    >
      <v-btn to="/">
        <span>Utama</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn to="overview">
        <span>Lain-lain</span>
        <v-icon>mdi-information</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

// import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  // components: {
  //   HelloWorld
  // },

  data: () => ({
    activeBtn: 1,
    loggedIn: false,
    showAppBar: false,
    showBackButton: false,
    showBottomBar: false,
    routeName: ""
  }),

  watch: {
    $route() {
      this.showBar();
      // console.log("TO : " + to.path);
    }
  },
  created() {
    this.showBar();
    firebase.auth().onAuthStateChanged(user => {
      this.loggedIn = !!user;
    });
  },
  methods: {
    showBar() {
      let route = this.$route;
      if (
        (this.isLoggedIn() && route.path == "/") ||
        route.path == "/overview"
      ) {
        this.showBottomBar = true;
      } else this.showBottomBar = false;

      if (
        route.path != "/" &&
        // route.path != "/overview" &&
        route.path != "/login"
      ) {
        this.showAppBar = true;
      } else this.showAppBar = false;

      if (route.path == "/overview") {
        this.routeName = "JintarKop";
        this.showBackButton = false;
      } else {
        this.routeName = route.name;
        this.showBackButton = true;
      }
      // console.log(route.name);
    },
    isLoggedIn() {
      return firebase.auth().currentUser;
    }
  }
};
</script>

<style>
body {
  overflow-x: hidden;
}
.theme--light.v-application {
  background: #dfe1e281 !important;
}
</style>