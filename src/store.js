/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from './router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
    loading: false,
    lock: true

  },
  mutations: {
    setUser (state, payload) {
      state.user, payload
    },
    setError (state, payload) {
      state.error, payload
    },
    setLoading (state, payload) {
      state.loading, payload
    },
    SET_LOCK (state, payload) {
      state.lock = payload
    }
    
  },
  actions: {
    async userSignUp({commit }, payload) {
      commit('setLoading', true)
      try {
        let user = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        commit('setUser', user)
        console.log(user)
        let result = await firebase.firestore().collection('Users').doc(user.user.uid).set({
          fullName: payload.fullName,
          studentId: payload.studentId,
          phone: payload.phone
        })
        commit('setLoading', false)
        console.log('user data added', result)
        router.push('/otp')
      } catch (err) {
        commit('setLoading', false)
        console.log(err)
      }
    },
    async sendVerify({commit}) {
      commit('setLoading', true)
      firebase.auth().currentUser.sendEmailVerification()
      .then(() => {
        commit('setLoading', false)
        console.log('sending verify link')
      }).catch(err => {
        commit('setLoading', false)
        console.log(err)
      })
    },
    async getVerify({ commit }) {
      console.log('is verify: ' +firebase.auth().currentUser.emailVerified)
    },
    login({ commit }, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then( user => {
        commit('setLoading', true)
        commit('setUser', user)
        console.log('logged in')
        console.log(user)
      })
      .catch(err => {
        commit('setLoading', true)
        commit('setUser', null)
        console.log(err)
      })
    },
    lockLocker({ commit }){
      firebase.database().ref('/').set({
        L1: 1
      })
      .then(() => {
        commit('SET_LOCK', true)
      })
      .catch(() => {
        commit('SET_LOCK', false)
      })
    },
    unlockLocker({ commit }){
      firebase.database().ref('/').set({
        L1: 0
      })
      .then(() => {
        commit('SET_LOCK', false)
      })
      .catch(() => {
        commit('SET_LOCK', true)
      })
    },
    getLockerState({ commit }){
      firebase.database().ref('/L1').once('value')
      .then(snapshot => {
        commit('SET_LOCK', snapshot.val())
      })
      .catch(err => {
        console.log(err)
      })
    }

  },
  getters: {
    getUser (state) {
      return state.user
    },
    getError (state) {
      return state.error
    },
    getLoading (state) {
      return state.loading
    },
    getLock (state) {
      return state.lock
    }
  }
})
