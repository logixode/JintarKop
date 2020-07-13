<template>
  <div class="container px-5">
    <v-form ref="form" @submit.prevent="pressed" lazy-validation>
      <v-text-field
        v-model="jenisKopi"
        :rules="emailRules"
        name="kopi"
        color="brown"
        label="Jenis Kopi"
        required
      ></v-text-field>

      <v-text-field
        v-model="berat.basah"
        :counter="5"
        :rules="passwordRules"
        name="basah"
        type="number"
        color="brown"
        label="Berat Basah (gr)"
        required
      ></v-text-field>

      <v-text-field
        v-model="berat.kering"
        :counter="5"
        :rules="passwordRules"
        name="kering"
        type="number"
        color="brown"
        label="Berat Kering (gr)"
        required
      ></v-text-field>
      <v-btn block dark large color="brown" class="mt-5" type="submit">Selesai</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    jenisKopi: "",
    berat: {
      basah: null,
      kering: null
    }
  })
};
</script>

<style lang="scss" scoped>
</style>