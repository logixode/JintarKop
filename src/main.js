import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";
import firebase from "firebase/app";
import vuetify from "./plugins/vuetify";

Vue.mixin({
  data: () => ({
    emailRules: [
      v => !!v || 'E-mail harus diisi',
      v => /.+@.+\..+/.test(v) || 'E-mail tidak valid',
    ],
    nameRules: [
      v => !!v || "Nama belum diisi",
      v => (v && v.length <= 10) || "Nama harus kurang dari 10 huruf",
      v => (v || "").indexOf(" ") < 0 || "Tidak boleh ada spasi"
    ],
    passwordRules: [
      v => !!v || "Password belum diisi",
      v => (v || "").indexOf(" ") < 0 || "Tidak boleh ada spasi"
    ],
    cantGoBack: true,
    // activeNavBtn: "home",
  }),
  methods: {
    goBack() {
      if (!this.cantGoBack) {
        this.$router.go(-1);
      } else this.$router.push('/');
    },
    canGoBack() {
      this.$router.afterEach((to, from) => {
        // console.log(from);
        if (from.name == null) {
          this.cantGoBack = true;
        } else this.cantGoBack = false;
      });
    },
  }
});
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBfSC9AkeIAiUpusRVJ49hMAX5U18xA8sk",
  authDomain: "jintarkop-2b9d2.firebaseapp.com",
  databaseURL: "https://jintarkop-2b9d2.firebaseio.com",
  projectId: "jintarkop-2b9d2",
  storageBucket: "jintarkop-2b9d2.appspot.com",
  messagingSenderId: "602636053987",
  appId: "1:602636053987:web:c39f1527c1dd52dcea04d6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth()
  .onAuthStateChanged((firebaseUser) => {
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App),
      created() {
        if (firebaseUser) {
          store.dispatch('autoSignIn', firebaseUser);
        }
      },
    }).$mount("#app");
  });
