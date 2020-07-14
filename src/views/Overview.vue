<template>
  <div>
    <v-list dense>
      <!-- <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>-->

      <v-list-item link to="/setting">
        <v-list-item-icon>
          <v-icon>mdi-cog</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Atur Alat</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link to="/register">
        <v-list-item-icon>
          <v-icon>mdi-account-multiple-plus</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Tambah User Baru</v-list-item-title>
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
export default {
  methods: {
    signOut() {
      this.$store.dispatch("userSignOut");
      this.$router.replace({ name: "Login" });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>