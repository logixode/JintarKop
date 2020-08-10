<template>
  <v-app class="red">
    <v-app-bar app elevation="0" v-if="showAppBar">
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->

      <v-btn icon large v-if="showBackButton" @click="goBack()">
        <v-icon v-if="cantGoBack">mdi-home</v-icon>
        <v-icon v-else>mdi-chevron-left</v-icon>
      </v-btn>
      <!-- <v-spacer /> -->
      <v-toolbar-title>{{ routeName }}</v-toolbar-title>
      <v-spacer />

      <v-btn icon to="/notification" @click="notificationClicked">
        <v-badge :value="messages" color="red" dot overlap>
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <v-main style="padding: 56px 0px;">
      <router-view />
      <v-snackbar v-model="snackbar">
        {{ snackbarMessage }}
        <template v-slot:action="{ attrs }">
          <v-btn color="orange" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
        </template>
      </v-snackbar>
    </v-main>

    <v-bottom-navigation app grow elevation="24" color="orange" v-if="showBottomBar">
      <v-btn to="/">
        <span>Utama</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn to="overview">
        <span>Lain-lain</span>
        <v-icon>mdi-view-grid</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "App",

  data: () => ({
    dark: true,
    showAppBar: false,
    showBackButton: false,
    showBottomBar: false,
    routeName: "",
    snackbar: false,
    snackbarMessage: "",
    param1: true,
    param2: true
  }),

  watch: {
    $route() {
      this.showBar();
      this.canGoBack();
      this.changeTitleName();

      // console.log(this.$store.state.user);
    },
    hardwareData: function(val) {
      if (val.beratTimbangan < this.dataBerat.kering) {
        this.snackbar = true;
        this.snackbarMessage = 'Tolong atur kembali alat anda di "Atur alat"';
      } else {
        this.snackbar = false;
        this.snackbarMessage = "";
      }

      const percentage =
        ((val.beratTimbangan - this.dataBerat.kering) /
          (this.dataBerat.basah - this.dataBerat.kering)) *
        100;

      if (
        percentage > 5 &&
        percentage <= 25 &&
        !this.$store.state.notifSend.kopiHampirKering
      ) {
        this.$store.dispatch("notifSend", {
          kopiKering: false,
          kopiHampirKering: true
        });

        let title = "Kopi hampir kering";
        let body = "Silahkan tunggu beberapa saat lagi";
        this.sendPushNotification(title, body);
        this.$store.dispatch("setNotification", {
          title: title,
          body: body
        });
        // console.log("notif2 terkirim");
      } else if (
        percentage >= 0 &&
        percentage <= 5 &&
        !this.$store.state.notifSend.kopiKering
      ) {
        this.$store.dispatch("notifSend", {
          kopiKering: true,
          kopiHampirKering: true
        });

        let title = "Kopi sudah kering";
        let body = "Silahkan angkat kopi dari alat segera";
        this.sendPushNotification(title, body);
        this.$store.dispatch("setNotification", {
          title: title,
          body: body
        });
        // console.log("notif1 terkirim");
      } else if (
        percentage >= 0 &&
        percentage <= 25 &&
        (this.$store.state.notifSend.kopiHampirKering ||
          this.$store.state.notifSend.kopiKering)
      ) {
        console.log("sudah dikirim sebelumnya");
      } else if (percentage > 25 && percentage <= 101) {
        if (
          this.$store.state.notifSend.kopiHampirKering ||
          this.$store.state.notifSend.kopiKering
        ) {
          this.$store.dispatch("notifSend", {
            kopiHampirKering: false,
            kopiKering: false
          });
          // console.log("tidak ada yang dikirim");
        }
      } else {
        if (
          this.$store.state.notifSend.kopiHampirKering ||
          this.$store.state.notifSend.kopiKering
        ) {
          this.$store.commit("infoNotifSend", {
            kopiKering: false,
            kopiHampirKering: false
          });
          // console.log("tidak ada yang dikirim");
        }
        // this.param1 = true;
        // this.param2 = true;
      }
    }
  },

  created() {
    this.changeTitleName();
    this.canGoBack();
    this.showBar();
    this.$store.dispatch("infoNotifSend");
  },

  computed: {
    messages() {
      return this.$store.state.notificationCount;
    },
    hardwareData() {
      return this.$store.state.hardwareData;
    },
    dataBerat() {
      return this.$store.state.aturData.berat;
    }
  },

  methods: {
    sendPushNotification(title, body) {
      for (let tokens in this.$store.state.token) {
        let token = this.$store.state.token[tokens].token;

        axios.post(
          "https://fcm.googleapis.com/fcm/send",
          {
            to: token,
            notification: {
              title: title,
              body: body,
              icon: "./img/icons/android-chrome-192x192.png"
            }
          },
          {
            headers: {
              Authorization:
                "key=AAAAjE_obeM:APA91bHqhE6HqEW0RNby49HaotdruvHWKyCAfrP9LICM9B_cO8A1dAZpTGIBoGZzxaKe_Zt60nblmM2DEkL-ySAYu_cPSU7NBd7s9EljEARH7ZwfwDbXEyESFkotJnHOZS8S0wIXA54P",
              "Content-Type": "application/json"
            }
          }
        );
        console.log(token);
      }
      console.log(this.$store.state.token);
    },
    notificationClicked() {
      this.$store.commit("notificationClicked");
    },
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