import Vue from "vue";
import Vuex from "vuex";
import firebase from 'firebase/app';
import { hardwareDataRef } from '../firebase';
import { notificationRef } from '../firebase';
import 'firebase/auth';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
    hardwareData: {
      berat: {
        basah: 0,
        kering: 0
      },
      jenisKopi: "",
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
    getHardwareData({ commit }) {
      hardwareDataRef.on('value', data => {
        commit('getHardwareData', data.val());
      });
    },
    setHardwareData(commit, payload) {
      hardwareDataRef.set({
        berat: payload.berat,
        jenisKopi: payload.jenisKopi,
        suhuKelembapan: payload.suhuKelembapan
      }).then(
        router.push('/')
      );
    },
    getNotification({ commit }) {
      notificationRef.on('value', data => {
        commit('getNotification', data.val());
      });
    }
  },
  modules: {}
});
