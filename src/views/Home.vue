<template>
  <v-container class="px-5">
    <div class="text-center">
      <img alt="Jintarkop" class="main-logo" src="../assets/logo.png" />
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
            :value="!isOpened ? 0 : tingkatKekeringan"
            class="main-progress"
          >
            <template v-slot:default v-if="!isOpened">
              <b>OFF</b>
            </template>
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
          :value="!isOpened ? 0 : kadarAir"
        >
          <template v-slot:default v-if="!isOpened">
            <b>OFF</b>
          </template>
          <template v-slot:footer>
            <b>Kadar Air</b>
          </template>
        </Progress>
        <div class="row ml-1 mt-3">
          <h4 class="text--secondary">Jenis Kopi :</h4>
          <div class="ml-1">
            <p v-if="!isOpened">-</p>
            <template v-else>
              <p>{{ jenisKopi }}</p>
            </template>
          </div>
        </div>
        <div class="row ml-1 mt-1">
          <h4 class="text--secondary">Status :</h4>
          <div class="ml-1">
            <p v-if="!isOpened">Alat Tertutup</p>
            <template v-else>
              <p v-if="tingkatKekeringan <= 65">Masih basah</p>
              <p v-else-if="tingkatKekeringan <= 95">Hampir Kering</p>
              <p v-else>Sudah Kering</p>
            </template>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-btn
      v-if="isOpened && !loading"
      outlined
      block
      color="orange"
      class="mt-1"
      @click="openToolCover"
    >
      <v-icon left>mdi-lock</v-icon>Tutup Alat
    </v-btn>
    <v-btn
      v-else-if="!isOpened && !loading"
      block
      dark
      color="orange"
      class="mt-1"
      @click="openToolCover"
    >
      <v-icon left>mdi-lock-open-variant</v-icon>Buka Alat
    </v-btn>
    <v-btn
      v-else
      disabled
      outlined
      block
      color="orange"
      class="mt-1"
      @click="openToolCover"
    >Loading...</v-btn>
    <v-btn block outlined color="brown" class="mt-3" to="/setting">
      <v-icon left>mdi-cog</v-icon>Atur alat
    </v-btn>

    <h4 class="mt-5 mb-2 text--secondary">Informasi Alat</h4>
    <v-card color="white" class="px-3 pt-3 pb-3 text-center">
      <v-row>
        <v-col cols="6">
          <h2>
            <template v-if="!isOpened">-</template>
            <template v-else>
              {{ hardwareData.beratTimbangan }}
              <sup>g</sup>
            </template>
          </h2>
          <p>Berat Saat Ini</p>
        </v-col>
        <v-col cols="6">
          <h2>
            <template v-if="!isOpened">-</template>
            <template v-else>
              {{ hardwareData.suhuKelembapan }}
              <sup>&#8451;</sup>
            </template>
          </h2>

          <p>Suhu Kelembapan</p>
        </v-col>
        <v-col cols="6">
          <h2>
            <template v-if="!isOpened">-</template>
            <template v-else>
              {{ dataBerat.basah }}
              <sup>g</sup>
            </template>
          </h2>
          <p>Berat Basah</p>
        </v-col>
        <v-col cols="6">
          <h2>
            <template v-if="!isOpened">-</template>
            <template v-else>
              {{ dataBerat.kering }}
              <sup>g</sup>
            </template>
          </h2>
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
    this.$store.dispatch("getData");
  },
  mounted() {
    this.$store.dispatch("requestPermission");
  },
  data: () => ({
    progressColor: {
      brown: "#FDAE20",
      blue: "#108fca"
    }
  }),
  computed: {
    kadarAir() {
      if (this.hardwareData.beratTimbangan < this.dataBerat.kering) {
        return "off";
      } else {
        const percentage =
          ((this.hardwareData.beratTimbangan - this.dataBerat.kering) /
            (this.dataBerat.basah - this.dataBerat.kering)) *
          100;
        if (percentage == 0) return 0.01;
        else return percentage.toFixed(2);
      }
    },
    tingkatKekeringan() {
      if (this.kadarAir == 0) return 100;
      else if (this.kadarAir == 100) return 0.001;
      else return (100 - this.kadarAir).toFixed(2);
    },
    hardwareData() {
      return this.$store.state.hardwareData;
    },
    dataBerat() {
      return this.$store.state.aturData.berat;
    },
    jenisKopi() {
      return this.$store.state.aturData.jenisKopi;
    },
    isOpened() {
      return this.$store.state.alatTerbuka;
    },
    loading() {
      return this.$store.state.loading;
    }
  },
  methods: {
    openToolCover() {
      if (this.isOpened) {
        this.$store.dispatch("setToolData", false);
      } else this.$store.dispatch("setToolData", true);
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
.main-progress .percent {
  font-size: 35px !important;
}
</style>