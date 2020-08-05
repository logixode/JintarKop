<template>
  <v-container class="px-5">
    <v-alert class="error" v-if="alert">
      <small>{{ error }}</small>
    </v-alert>
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

    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class>Apakah data tersebut sudah benar?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange darken-1" text @click="dialog = false">Perbaiki</v-btn>
          <v-btn color="blue darken-1" text @click="agreeSubmit">Lanjutkan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    name: "",
    password: "",
    alert: false,
    dialog: false
  }),

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
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.dialog = true;
      }
    },
    agreeSubmit() {
      this.$store.dispatch("userSignUp", {
        email: this.name + "@123.com",
        password: this.password
      });

      if (this.error == "") {
        this.$router.replace({ name: "Home" });
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
