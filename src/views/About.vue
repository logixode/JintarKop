<template>
  <v-container class="px-5">
    <div class="text-center mb-2">
      <img alt="Jintarkop" class="main-logo mb-3" src="../assets/logo.png" />
    </div>
    <v-card color="white" class="px-4 pt-4 pb-3">
      <p class="mb-3">
        <span class="font-weight-bold orange--text">Jintarkop</span> (jemuran pintar kopi) adalah suatu aplikasi yang digunakan untuk memonitoring kadar air pada kopi dengan menggunakan sensor timbangan pada alat yang dibuat.
      </p>
      <h4 class="orange--text mt-5">Pembimbing :</h4>
      <p class="ml-2">Endi Sailul Haq, S.T., M.Kom.</p>
      <h4 class="orange--text mt-5">Anggota Tim :</h4>
      <ol>
        <li>Erisa Zahra Dina (Ketua)</li>
        <li>Faida Evita Maynasari</li>
        <li>Zulfa Aulia</li>
        <li>Adining Tri Karunia Putri</li>
        <li>Gading Bengawan</li>
        <li>Agung Wahyu Widodo</li>
        <li>Dika Hermawan</li>
        <li>Rohmad Kurniadi</li>
        <li>Feti Firdaus</li>
        <li>Muhammad Rizki Ismail</li>
      </ol>
    </v-card>
  </v-container>
</template>

<script >
import axios from "axios";
export default {
  data: () => ({}),
  mounted() {
    axios.post(
      "https://fcm.googleapis.com/fcm/send",
      {
        to:
          "etF4SPFRZ4BIaFc9YNZMTB:APA91bEYwei0meKd3fEbairCMqrFo4Q91YnAYUsYd9zzovMHbBUYKA24j94j7_bFiqbCxD6HdMxju4dzRiEmvEyiJW8B168f9CAvJZtyJVkz8u3os_Gurm3CTHiWgbSueA5nRFEyZwl6",
        notification: {
          title: "Kopi sudah kering",
          body: "Silahkan angkat kopi pada alat",
          icon: "./img/icons/android-chrome-192x192.png"
        }
      },
      {
        headers: {
          Authorization:
            "key=AAAAjE_obeM:APA91bHqhE6HqEW0RNby49HaotdruvHWKyCAfrP9LICM9B_cO8A1dAZpTGIBoGZzxaKe_Zt60nblmM2DEkL-ySAYu_cPSU7NBd7s9EljEARH7ZwfwDbXEyESFkotJnHOZS8S0wIXA54P",
          "Content-Type": "application/json"
        }
      }
    );
  }
};
</script>

<style scoped>
p {
  margin-bottom: 0;
}
.main-logo {
  height: 160px;
}
.v-card p {
  text-align: justify;
}
</style>