<template>
  <v-container class="mt-1">
    <template v-if="!this.$store.state.notification">
      <div class="relative">
        <div class="vertical-center">
          <img alt="Jintarkop" class="main-logo" src="../assets/empty-data.svg" />
          <h3>Oops! Data kosong...</h3>
        </div>
      </div>
    </template>
    <v-card
      color="white"
      class="pt-3 px-4 mb-3"
      v-for="(notification, id) in this.$store.state.notification"
      :key="id"
    >
      <v-row>
        <v-col cols="2" class="pl-4 mt-3">
          <img alt="logo-icon" class="icon mb-3" src="../assets/icon.png" />
        </v-col>
        <v-col cols="10">
          <div class="d-flex justify-space-between">
            <h4>{{ notification.title }}</h4>
            <small
              class="mb-0"
            >{{ new Date(notification.timestamp).getHours() }}:{{ new Date(notification.timestamp).getMinutes() }}</small>
          </div>
          <p>{{ notification.body }}</p>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("getNotification");
  },
  data: () => ({
    progressColor: {
      brown: "#FDAE20",
      blue: "#108fca"
    },
    notifications: {}
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
    }
  },
  methods: {
    openToolCover() {
      if (this.isOpened) {
        this.$store.dispatch("setToolData", false);
      } else this.$store.dispatch("setToolData", true);
    }
  }
};
</script>

<style scoped>
.icon {
  height: 30px;
}
.main-logo {
  height: 290px;
}
.relative {
  height: 80vh;
  position: relative;
  text-align: center;
}
</style>

<style>
.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%) translateX(-50%);
  left: 50%;
}
</style>