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
        <v-badge :value="messages" color="red" dot overlap>
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

    <v-bottom-navigation app grow elevation="24" color="orange" v-if="showBottomBar">
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
export default {
  name: "App",

  data: () => ({
    dark: true,
    showAppBar: false,
    showBackButton: false,
    showBottomBar: false,
    routeName: ""
  }),

  watch: {
    $route() {
      this.showBar();
      this.canGoBack();
      this.changeTitleName();

      // console.log(this.$store.state.user);
    }
  },

  created() {
    this.changeTitleName();
    this.canGoBack();
    this.showBar();
  },

  computed: {
    messages() {
      return this.$store.state.notificationCount;
    }
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
      if (route.path == "/" || route.path == "/overview") {
        this.showBottomBar = true;
      } else this.showBottomBar = false;

      // back button
      if (route.path != "/" && route.path != "/overview") {
        this.routeName = route.name;
        this.showBackButton = true;
        this.dark = true;
        // console.log(route);
      }
      // default
      else {
        this.routeName = "Jemuran Pintar Kopi";
        this.showBackButton = false;
        this.dark = false;
      }
      // console.log(route.name);
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
.v-item-group.v-bottom-navigation--grow .v-btn {
  height: 55px !important;
}
</style>