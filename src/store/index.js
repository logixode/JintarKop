import Vue from "vue";
import Vuex from "vuex";
import firebase from 'firebase/app';
import { hardwareDataRef } from '../firebase';
import 'firebase/auth';
import router from '@/router';

Vue.use(Vuex);

// const dataHardware = db.ref('dataHardware');

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
    hardwareData: {}
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
      commit('setLoading', true);
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit('setUser', { email: firebaseUser.user.email });
          commit('setLoading', false);
          router.push('/home');
        })
        .catch(error => {
          commit('setError', error.message);
          commit('setLoading', false);
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
    }
  },
  modules: {}
});
