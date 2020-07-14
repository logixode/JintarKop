<template>
  <v-container class="px-5">
    <div class="text-center">
      <img alt="Jintarkop" class="main-logo mb-3" src="../assets/logo.png" />
    </div>

    <div class="d-flex text-center">
      <div class="flex-grow-1">
        <h1>OFF</h1>
        <h3>Pengering 1</h3>
      </div>
      <div class="flex-grow-1">
        <h1>OFF</h1>
        <h3>Pengering 2</h3>
      </div>
    </div>
    <v-btn block outlined large color="brown" class="mt-5" to="/setting">Atur alat</v-btn>

    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home"
  // components: {
  //   HelloWorld
  // }
};
</script>
