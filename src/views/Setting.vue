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

      <v-row>
        <v-col>
          <v-text-field
            v-model="berat.basah"
            :counter="5"
            name="basah"
            type="number"
            color="brown"
            label="Berat Basah (gr)"
          ></v-text-field>
        </v-col>

        <v-col>
          <v-text-field
            v-model="berat.kering"
            :counter="5"
            :rules="isFilled"
            name="kering"
            type="number"
            color="brown"
            label="Berat Kering (gr)"
            required
          ></v-text-field>
        </v-col>
      </v-row>

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
    berat: {
      basah: null,
      kering: null
    },
    dialog: false
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.dialog = true;
      }
    },
    agreeSubmit() {
      this.$store.dispatch("setHardwareData", {
        berat: this.berat,
        jenisKopi: this.jenisKopi,
        suhuKelembapan: this.$store.state.hardwareData.suhuKelembapan
      });
    }
  }
};
</script>

<style>
.v-card__title {
  word-break: unset !important;
}
</style>