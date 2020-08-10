<template>
  <v-container class="px-5">
    <v-form ref="form" @submit.prevent="submit" lazy-validation>
      <v-select
        v-model="jenisKopi"
        :items="listKopi"
        :rules="isFilled"
        color="brown"
        name="kopi"
        label="Jenis Kopi"
        required
      ></v-select>

      <h5 class="orange--text">Berat Kopi</h5>

      <v-text-field
        v-model="beratTimbangan"
        :counter="5"
        name="basah"
        type="number"
        color="brown"
        label="Berat Basah (gr)"
      ></v-text-field>
      <v-text-field
        v-model="beratKering"
        :counter="5"
        :rules="isFilled"
        name="kering"
        type="number"
        color="brown"
        label="Berat Kering (gr)"
        required
      ></v-text-field>

      <v-btn block dark large color="brown" class="mt-5" type="submit">Selesai</v-btn>
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
    listKopi: ["Robusta", "Arabika", "Campuran"],
    jenisKopi: null,
    beratKering: null,
    dialog: false
  }),
  computed: {
    beratTimbangan() {
      return this.$store.state.hardwareData.beratTimbangan;
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.dialog = true;
      }
    },
    agreeSubmit() {
      this.$store.dispatch("setData", {
        berat: {
          basah: this.beratTimbangan,
          kering: this.beratKering
        },
        jenisKopi: this.jenisKopi
      });
      this.$store.dispatch("setNotification", {});
      this.$store.commit("notificationClicked");
    }
  }
};
</script>

<style>
.v-card__title {
  word-break: unset !important;
}
</style>