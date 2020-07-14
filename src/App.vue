<template>
  <v-app class="red">
    <v-app-bar
      app
      :dark="dark ? true : false"
      :color="dark ? '#FDAE20' : 'white'"
      :elevation="dark ? '3' : '0'"
      v-if="showAppBar"
    >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->

      <v-btn icon large v-if="showBackButton" @click="goBack()">
        <v-icon v-if="cantGoBack">mdi-home</v-icon>
        <v-icon v-else>mdi-chevron-left</v-icon>
      </v-btn>
      <!-- <v-spacer /> -->
      <v-toolbar-title>{{ routeName }}</v-toolbar-title>
      <v-spacer />

      <v-btn icon to="/notification">
        <v-icon>mdi-bell</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view />
      <!-- <HelloWorld /> -->
    </v-content>

    <v-bottom-navigation
      app
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
    dark: true,
    loggedIn: false,
    showAppBar: false,
    showBackButton: false,
    showBottomBar: false,
    routeName: ""
  }),

  watch: {
    $route() {
      this.showBar();
      this.canGoBack();
    }
  },
  created() {
    this.canGoBack();
    this.showBar();
    firebase.auth().onAuthStateChanged(user => {
      this.loggedIn = !!user;
    });
  },
  methods: {
    showBar() {
      let route = this.$route;

      // app bar
      if (
        // route.path != "/" &&
        // route.path != "/overview" &&
        route.path != "/login"
      ) {
        this.showAppBar = true;
      } else this.showAppBar = false;

      // bottom bar
      if (
        (this.isLoggedIn() && route.path == "/") ||
        route.path == "/overview"
      ) {
        this.showBottomBar = true;
      } else this.showBottomBar = false;

      // back button
      if (route.path != "/" && route.path != "/overview") {
        this.routeName = route.name;
        this.showBackButton = true;
        this.dark = true;
        // console.log(route);
      } else {
        this.routeName = "JintarKop";
        this.showBackButton = false;
        this.dark = false;
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
  background: #f5f5f5 !important;
}
.main-logo {
  height: 150px;
}
</style>