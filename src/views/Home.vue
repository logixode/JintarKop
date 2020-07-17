<template>
  <v-container class="px-5">
    <div class="text-center">
      <img alt="Jintarkop" class="main-logo mb-3" src="../assets/logo.png" />
    </div>

    <div class="d-flex text-center py-3">
      <div class="flex-grow-1">
        <h1>OFF</h1>
        <h3>Pengering 1</h3>
      </div>
      <div class="flex-grow-1">
        <h1>OFF</h1>
        <h3>Pengering 2</h3>
      </div>
    </div>
    <v-btn
      v-if="isClosed"
      block
      outlined
      color="orange"
      class="mt-5"
      @click="openToolCover"
    >Tutup Penutup Alat</v-btn>
    <v-btn
      v-else
      block
      outlined
      color="orange"
      class="mt-5"
      @click="openToolCover"
    >Buka Penutup Alat</v-btn>
    <v-btn block outlined color="brown" class="mt-5" to="/setting">Atur alat</v-btn>

    <v-card color="white" class="px-3 mt-5 pt-4 pb-1 text-center">
      <h3>Data Pengering 1</h3>
      <v-row>
        <v-col cols="4">
          <h4>Berat Basah</h4>
          <h2>0 kg</h2>
        </v-col>
        <v-col cols="4">
          <h4>Berat Kering</h4>
          <h2>0 kg</h2>
        </v-col>
        <v-col cols="4">
          <h4>Kadar Air</h4>
          <h2>0%</h2>
        </v-col>
      </v-row>

      <v-divider class="mt-2 mb-4"></v-divider>

      <h3>Data Pengering 2</h3>
      <v-row>
        <v-col cols="4">
          <h4>Berat Basah</h4>
          <h2>0 kg</h2>
        </v-col>
        <v-col cols="4">
          <h4>Berat Kering</h4>
          <h2>0 kg</h2>
        </v-col>
        <v-col cols="4">
          <h4>Kadar Air</h4>
          <h2>0%</h2>
        </v-col>
      </v-row>
    </v-card>

    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  data: () => ({
    isClosed: false
  }),
  methods: {
    openToolCover() {
      this.isClosed = !this.isClosed;
    }
  }
  // components: {
  //   HelloWorld
  // }
};
</script>

<style scoped>
.main-logo {
  height: 130px;
}
</style>