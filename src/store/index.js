import Vue from "vue";
import Vuex from "vuex";
import firebase from 'firebase/app';
import { aturDataRef, hardwareDataRef, notificationRef, openToolRef } from '../firebase';
import 'firebase/auth';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
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
    notification: {},
    notificationCount: 0
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    getData(state, payload) {
      state.aturData = payload;
    },
    getToolData(state, payload) {
      state.alatTerbuka = payload;
    },
    getHardwareData(state, payload) {
      state.hardwareData = payload;
    },
    getNotification(state, payload) {
      state.notification.push(payload);
    }
  },
  actions: {
    userSignIn({ commit }, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          firebaseUser => {
            commit('setUser', { email: firebaseUser.user.email });
            commit('setError', null);
            router.push('/');
          },
          (this.error = ""))
        .catch(err => {
          commit('setError', err.message);
          // console.log(err);
        });
    },
    userSignUp({ commit }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit('setUser', { email: firebaseUser.user.email });
          router.push('/');
        })
        .catch(error => {
          commit('setError', error.message);
        });
    },
    autoSignIn({ commit }, payload) {
      commit('setUser', { email: payload.email });
    },
    userSignOut({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
      router.replace('/login');
    },
    getData({ commit }) {
      aturDataRef.on('value', data => {
        commit('getData', data.val());
      });
      hardwareDataRef.on('value', data => {
        commit('getHardwareData', data.val());
      });
      openToolRef.on('value', data => {
        commit('getToolData', data.val());
      });
    },
    setData(commit, payload) {
      aturDataRef.set({
        berat: payload.berat,
        jenisKopi: payload.jenisKopi,
      }).then(
        router.push('/')
      );
    },
    setToolData(commit, payload) {
      openToolRef.set(payload);
    },
    getNotification({ commit }) {
      notificationRef.on('value', data => {
        commit('getNotification', data.val());
      });
    }
  },
  modules: {}
});
