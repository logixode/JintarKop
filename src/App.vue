<template>
  <v-app>
    <v-app-bar app color="white" v-if="isLoggedIn()">
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->

      <v-spacer />
      <v-toolbar-title>JintarKop</v-toolbar-title>
      <v-spacer />

      <!-- <v-btn icon>
        <v-icon></v-icon>
      </v-btn>-->
    </v-app-bar>

    <v-content>
      <router-view />
      <!-- <HelloWorld /> -->
    </v-content>

    <v-bottom-navigation app value="1" grow elevation="24" color="teal" v-if="isLoggedIn()">
      <v-btn to="/">
        <span>Hoem</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn to="overview">
        <span>Overview</span>
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
    loggedIn: false
  }),
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.loggedIn = !!user;
    });
  },
  methods: {
    isLoggedIn() {
      return firebase.auth().currentUser;
    }
  }
};
</script>
