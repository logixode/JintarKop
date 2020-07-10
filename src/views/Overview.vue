<template>
  <div>
    <v-list dense>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click="signOut">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  methods: {
    async signOut() {
      await firebase.auth().signOut();
      // .then((this.error = ""));
      // .catch(err => {
      //     this.error = err;
      //     // console.log(err);
      // });
      await this.$router.replace({ name: "Login" });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>