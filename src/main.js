import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";
import firebase from "firebase/app";
import vuetify from "./plugins/vuetify";

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

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
