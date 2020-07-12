<template>
  <div class="container">
    <h3>Tambahkan user baru</h3>
    <v-form ref="form" v-model="valid" @submit.prevent="submit" lazy-validation>
      <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Nama Panggilan" required></v-text-field>

      <v-text-field
        v-model="password"
        :counter="10"
        :rules="passwordRules"
        label="Password"
        required
      ></v-text-field>
      <v-btn block large color="primary" class="mt-5" type="submit">Tambahkan</v-btn>
    </v-form>

    <div v-if="error" class="error">{{ error.message }}</div>

    <!-- <form @submit.prevent="submit">
      <div>
        <input v-model="email" type="email" name="email" placeholder="email" />
      </div>
      <div>
        <input v-model="password" type="password" name="password" placeholder="password" />
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>-->
  </div>
</template>

<script>
// import * as firebase from "firebase/app";
// import "firebase/auth";

export default {
  methods: {
    async submit() {
      this.$refs.form.validate();

      // await firebase
      //   .auth()
      //   .createUserWithEmailAndPassword(this.email, this.password)
      //   .then((this.error = ""))
      //   .catch(err => {
      //     this.error = err;
      //     // console.log(err);
      //   });
      // if (this.error == "") {
      //   await this.$router.replace({ name: "Home" });
      // }
    }
  },
  data: () => ({
    name: "",
    password: "",
    error: "",
    nameRules: [
      v => !!v || "Nama belum diisi",
      v => (v && v.length <= 10) || "Nama harus kurang dari 10 huruf",
      v => (v || "").indexOf(" ") < 0 || "Tidak boleh ada spasi"
    ],
    passwordRules: [
      v => !!v || "Password belum diisi",
      v => (v || "").indexOf(" ") < 0 || "Tidak boleh ada spasi"
    ]
  })
};
</script>

<style lang="scss" scoped></style>
