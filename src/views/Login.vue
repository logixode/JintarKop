<template>
  <div>
    <div class="container">
      <div class="wave"></div>
      <div class="wave -two"></div>
      <div class="wave -three"></div>
      <div class="title">
        <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->

        <div v-if="error" class="error">{{ error.message }}</div>
        <form @submit.prevent="pressed">
          <div>
            <input v-model="email" type="email" name="email" placeholder="email" />
          </div>
          <div>
            <input v-model="password" type="password" name="password" placeholder="password" />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
    <div class="container absolute text-center my-5">
      <v-btn class="ma-2" tile outlined color="blue" large>
        <v-icon left>mdi-google</v-icon>Masuk dengan Google
      </v-btn>
      <h5 class="grey--text">
        Silahkan Login terlebih dahulu
        <br />untuk melanjutkan
      </h5>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  methods: {
    async pressed() {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((this.error = ""))
        .catch(err => {
          this.error = err;
          // console.log(err);
        });
      if (this.error == "") {
        await this.$router.replace({ name: "Home" });
      }
    }
  },
  data: () => ({
    email: "",
    password: "",
    error: ""
  })
};
</script>

<style scoped>
.absolute {
  position: absolute;
  bottom: 2.5%;
}
.wave {
  opacity: 0.4;
  top: 3%;
  background: #fcae1b;
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
  position: absolute;
}

.wave.-two {
  animation: drift 7000ms infinite linear;
  position: absolute;
  opacity: 0.4;
  background: #fcad1ba4;
}

.title {
  position: absolute;
  left: 0;
  top: 25%;
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
