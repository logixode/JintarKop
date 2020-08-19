import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import { db } from "../firebase";
import "firebase/auth";
import "firebase/messaging";
import router from "@/router";
// import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    error: null,
    loading: false,
    aturData: {
      berat: {
        basah: 0,
        kering: 0
      },
      jenisKopi: "",
    },
    alatTerbuka: false,
    hardwareData: {
      beratTimbangan: 0,
      suhuKelembapan: 0
    },
    notification: [],
    notifSend: {},
    notificationCount: 0
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setData(state, payload) {
      state.aturData = payload;
    },
    setToolData(state, payload) {
      state.alatTerbuka = payload;
    },
    setHardwareData(state, payload) {
      state.hardwareData = payload;
    },
    getNotification(state, payload) {
      state.notification = payload;
    },
    addNotification(state) {
      state.notificationCount++;
    },
    setToken(state, payload) {
      state.token = payload;
    },
    notificationClicked(state) {
      state.notificationCount = 0;
    },
    infoNotifSend(state, payload) {
      state.notifSend = payload;
    }
  },
  actions: {
    userSignIn({ commit }, payload) {
      commit('setLoading', true);
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          firebaseUser => {
            commit("setUser", { email: firebaseUser.user.email });
            commit("setError", null);
            commit('setLoading', false);
            router.push("/");
          },
          (this.error = ""))
        .catch(err => {
          commit('setLoading', false);
          commit("setError", err.message);
          // console.log(err);
        });
    },
    signInWithGoogle({ commit }) {
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(firebaseUser => {
          commit("setUser", { email: firebaseUser.user.email });
          router.push("/");
        })
        .catch(error => {
          commit("setError", error.message);
        });
    },
    userSignUp({ commit }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit("setUser", { email: firebaseUser.user.email });
          router.push("/");
        })
        .catch(error => {
          commit("setError", error.message);
        });
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", { email: payload.email });
    },
    userSignOut({ commit }) {
      firebase.auth().signOut()
        .then(() =>
          router.replace("/login")
        );
      commit("setUser", null);
    },
    getData({ commit }) {
      db.ref("aturData").on("value", data => {
        commit("setData", data.val());
      });
      db.ref("dataHardware").on("value", data => {
        commit("setHardwareData", data.val());
      });
      db.ref("alatTerbuka").on("value", data => {
        commit("setToolData", data.val());
      });
      db.ref("token").on("value", data => {
        commit("setToken", data.val());
      });
    },
    setData(commit, payload) {
      db.ref("aturData").set({
        berat: payload.berat,
        jenisKopi: payload.jenisKopi,
      }).then(
        router.push("/")
      );
    },
    setToolData({ commit }, payload) {
      commit('setLoading', true);
      db.ref("alatTerbuka").set(payload).then(() => commit('setLoading', false));
    },
    getNotification({ commit }) {
      db.ref("notifikasi").on("value", data => {
        commit("getNotification", data.val());
        console.log(data.val());
      });
    },
    setNotification({ commit, dispatch }, payload) {
      if (!payload.title) {
        db.ref("notifikasi").remove();
        console.log("test");
      } else {
        db.ref("notifikasi").orderByChild("title")
          .equalTo(payload.title).on('value')
          .then(snapshot => {
            if (!snapshot.val()) {
              db.ref("notifikasi").push({
                title: payload.title,
                body: payload.body,
                timestamp: Date.now()
              }).then(
                commit("addNotification"),
                dispatch("getNotification")
              );
            }
          });
      }
    },
    infoNotifSend({ commit }) {
      db.ref("notifSend").on("value", data => {
        commit("infoNotifSend", data.val());
      });
    },
    notifSend({ commit }, payload) {
      db.ref("notifSend").set({
        kopiHampirKering: payload.kopiHampirKering,
        kopiKering: payload.kopiKering
      });
      commit("infoNotifSend", {
        kopiHampirKering: payload.kopiHampirKering,
        kopiKering: payload.kopiKering
      });
    },
    requestPermission({ dispatch }) {
      firebase.messaging().requestPermission()
        .then(() => dispatch("handleTokenRefresh"))
        .catch(err => console.log(err));
    },
    handleTokenRefresh() {
      firebase.messaging().getToken()
        .then(token => {
          // commit("setToken", {
          //   token: token,
          // });
          db.ref("token").orderByChild("token")
            .equalTo(token).once('value')
            .then(snapshot => {
              if (!snapshot.val()) {
                db.ref("token").push({
                  token: token
                });
              }
            });
        });
    },
  },
  modules: {}
});
