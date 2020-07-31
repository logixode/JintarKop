<template>
  <v-container class="px-5">
    <div class="text-center mt-3">
      <img alt="Jintarkop" class="main-logo mb-3" src="../assets/logo.png" />
    </div>

    <!-- <div class="text-center py-5">
      <h1>OFF</h1>
      <h4>Kondisi Pengering</h4>
    </div>-->
    <!-- <v-card color="white" class="px-3 mt-5 pt-5 pb-3 text-center"> -->
    <v-row>
      <v-col cols="6">
        <div class="text-center">
          <Progress
            :transitionDuration="1450"
            :strokeColor="tingkatKekeringan < 75 ? progressColor.blue : progressColor.brown"
            :radius="75"
            :strokeWidth="10"
            :value="tingkatKekeringan"
            class="main-progress"
          >
            <template v-slot:footer>
              <b>Tingkat Kekeringan</b>
            </template>
          </Progress>
        </div>
      </v-col>
      <v-col cols="6" class="text-center">
        <Progress
          :transitionDuration="1450"
          :strokeColor="kadarAir >= 25 ? progressColor.blue : progressColor.brown"
          :radius="45"
          :strokeWidth="8"
          :value="kadarAir"
        >
          <template v-slot:footer>
            <b>Kadar Air</b>
          </template>
        </Progress>
        <div class="row ml-1 mt-3">
          <h4>Jenis Kopi :</h4>
          <div class="ml-1">
            <p>{{ jenisKopi }}</p>
          </div>
        </div>
        <div class="row ml-1 mt-1">
          <h4>Status :</h4>
          <div class="ml-1">
            <p v-if="tingkatKekeringan <= 65">Masih basah</p>
            <p v-else-if="tingkatKekeringan <= 92">Hampir Kering</p>
            <p v-else>Sudah Kering</p>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-btn
      v-if="isClosed"
      outlined
      block
      color="orange"
      class="mt-5"
      @click="openToolCover"
    >Tutup Alat</v-btn>
    <v-btn v-else outlined block color="orange" class="p-2 mt-5" @click="openToolCover">Buka Alat</v-btn>
    <v-btn block outlined color="brown" class="mt-5" to="/setting">Atur alat</v-btn>

    <v-card color="white" class="px-3 mt-5 pt-5 pb-3 text-center">
      <h3>Data Pengering</h3>
      <v-row>
        <v-col cols="12">
          <h2>{{ suhuKelembapan }} &#8451;</h2>
          <p>Suhu Kelembapan</p>
        </v-col>
        <v-col cols="6">
          <h2>{{ dataBerat.basah/1000 }} kg</h2>
          <p>Berat Basah</p>
        </v-col>
        <v-col cols="6">
          <h2>{{ dataBerat.kering/1000 }} kg</h2>
          <p>Berat Kering</p>
        </v-col>
      </v-row>
    </v-card>

    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </v-container>
</template>

<script>
// @ is an alias to /src
import Progress from "easy-circular-progress";
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    Progress
  },
  created() {
    this.$store.dispatch("getHardwareData");
  },
  data: () => ({
    progressColor: {
      brown: "#FDAE20",
      blue: "#108fca"
    },
    // value: 0,
    isClosed: false
  }),
  computed: {
    tingkatKekeringan() {
      const percentage = (this.dataBerat.kering / this.dataBerat.basah) * 100;
      return percentage.toFixed(2);
    },
    kadarAir() {
      return (100 - this.tingkatKekeringan).toFixed(2);
    },
    suhuKelembapan() {
      return this.$store.state.hardwareData.suhuKelembapan;
    },
    dataBerat() {
      return this.$store.state.hardwareData.berat;
    },
    jenisKopi() {
      return this.$store.state.hardwareData.jenisKopi;
    }
  },
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
p {
  margin-bottom: 0;
}
.main-logo {
  height: 120px;
}
</style>
<style>
.main-progress .percent__int {
  font-size: 45px !important;
}
.main-progress .percent__dec,
.main-progress .percent_sign {
  font-size: 22px !important;
}
</style>