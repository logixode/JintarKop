<template>
  <div>
    <div class="wave"></div>
    <div class="wave -two"></div>
    <div class="wave -three"></div>
    <div class="title px-10">
      <img alt="Jintarkop" class="main-logo mb-3" src="../assets/logo-light.png" />

      <v-alert class="error" v-if="alert">{{ error }}</v-alert>
      <v-form ref="form" @submit.prevent="signIn" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          name="email"
          color="brown"
          label="Nama Panggilan"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :counter="10"
          :rules="passwordRules"
          type="password"
          name="password"
          color="brown"
          label="Password"
          required
        ></v-text-field>
        <v-btn block dark large color="brown" class="mt-5" type="submit">Login</v-btn>
      </v-form>
    </div>
    <div class="text-center px-10 my-15">
      <h5 class="grey--text">Atau login menggunakan metode lain</h5>
      <v-btn class="mt-2 my-5" tile outlined color="blue" block large>
        <v-icon left>mdi-google</v-icon>Masuk dengan Google
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
    alert: false
  }),
  methods: {
    async signIn() {
      if (this.$refs.form.validate()) {
        await this.$store.dispatch("userSignIn", {
          email: this.email,
          password: this.password
        });

        if (this.error == "") {
          await this.$router.replace({ name: "Home" });
        }
      }
    }
  },
  computed: {
    error() {
      return this.$store.state.error;
    }
  },
  watch: {
    error(value) {
      if (value) {
        this.alert = true;
      }
    },
    alert(value) {
      if (!value) {
        this.$store.commit("setError", null);
      }
    }
  }
};
</script>

<style scoped>
.main-logo {
  height: 170px;
}
.absolute {
  position: absolute;
  bottom: 2.5%;
}
.wave {
  opacity: 0.9;
  top: 3%;
  background: #f3a215;
  width: 700px;
  height: 700px;
  margin-left: -150px;
  margin-top: -200px;
  transform-origin: 50% 48%;
  border-radius: 43%;
  animation: drift-data-v-26084dc2 10000ms infinite linear;
}

.wave.-three {
  animation: drift 8500ms infinite linear;
  opacity: 0.5;
  position: absolute;
}

.wave.-two {
  animation: drift 7000ms infinite linear;
  position: absolute;
  opacity: 0.7;
  background: #fcad1ba4;
}

.title {
  position: absolute;
  left: 0;
  top: 8%;
  width: 100%;
  z-index: 1;
  text-align: center;
  transform: translate3d(0, 0, 0);
}
@keyframes drift {
  from {
    transform: rotate(0deg);
  }
  from {
    transform: rotate(360deg);
  }
}
</style>
