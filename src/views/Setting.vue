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
            disabled
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
  </v-container>
</template>

<script>
export default {
  data: () => ({
    jenisKopi: null,
    listKopi: ["Kopi Robusta", "Kopi Arabika", "Kopi Campuran"],
    berat: {
      basah: null,
      kering: null
    }
  }),
  methods: {
    submit() {
      this.$refs.form.validate();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>