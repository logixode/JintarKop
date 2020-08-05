<template>
  <v-container class="text-center">
    <v-row class="mx-1">
      <v-col cols="6">
        <v-card color="white" class="pt-10 px-3" height="160" to="/setting">
          <v-icon x-large>mdi-cog</v-icon>
          <p class="mt-2">Atur Alat</p>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card color="white" class="pt-10 px-3" height="160" to="/register">
          <v-icon x-large>mdi-account-multiple-plus</v-icon>
          <p>Tambah Pengguna Baru</p>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card color="white" class="pt-10 px-3" height="160" to="/about">
          <v-icon x-large>mdi-information</v-icon>
          <p class="mt-2">Tentang Kami</p>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card color="white" class="pt-10 px-3" height="160" @click="signOut">
          <v-icon x-large>mdi-logout</v-icon>
          <p class="mt-2">Keluarkan akun</p>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-list dense>
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
    </v-list>-->
  </v-container>
</template>

<script>
export default {};
</script>