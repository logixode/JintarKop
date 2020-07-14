<template>
  <v-container class="px-5">
    <h3>Tambahkan user baru</h3>
    <v-form ref="form" @submit.prevent="submit" lazy-validation>
      <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Nama Panggilan" required></v-text-field>

      <v-text-field
        v-model="password"
        :counter="10"
        :rules="passwordRules"
        label="Password"
        required
      ></v-text-field>
      <v-btn block large dark color="brown" class="mt-5" type="submit">Tambahkan</v-btn>
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
  </v-container>
</template>

<script>
export default {
  data: () => ({
    name: "",
    password: ""
  }),

  methods: {
    async submit() {
      this.$refs.form.validate();

      await this.$store.dispatch("userSignUp", {
        email: this.email,
        password: this.password
      });

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
  }
};
</script>

<style lang="scss" scoped></style>
