<template>
  <v-container class="mt-1">
    <v-card color="white" class="pt-3 px-4 mb-3">
      <v-row>
        <v-col cols="2" class="pl-4 mt-3">
          <img alt="logo-icon" class="icon mb-3" src="../assets/icon.png" />
        </v-col>
        <v-col cols="10">
          <div class="d-flex justify-space-between">
            <h4>Alat telah dibuka</h4>
            <small class="mb-0">16.00</small>
          </div>
          <p>Penutup alat berhasil dibuka</p>
        </v-col>
      </v-row>
    </v-card>
    <v-card color="white" class="pt-3 px-4 mb-3">
      <v-row>
        <v-col cols="2" class="pl-4 mt-3">
          <img alt="logo-icon" class="icon mb-3" src="../assets/icon.png" />
        </v-col>
        <v-col cols="10">
          <div class="d-flex justify-space-between">
            <h4>Alat telah ditutup</h4>
            <small class="mb-0">16.00</small>
          </div>
          <p>Penutup alat berhasil ditutup</p>
        </v-col>
      </v-row>
    </v-card>
    <v-card color="white" class="pt-3 px-4 mb-3">
      <v-row>
        <v-col cols="2" class="pl-4 mt-3">
          <img alt="logo-icon" class="icon mb-3" src="../assets/icon.png" />
        </v-col>
        <v-col cols="10">
          <div class="d-flex justify-space-between">
            <h4>Kopi A sudah kering</h4>
            <small class="mb-0">16.00</small>
          </div>
          <p>Silahkan angkat kopi pada Pengering 1</p>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.icon {
  height: 30px;
}
</style>