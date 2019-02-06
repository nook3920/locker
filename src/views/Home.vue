<template>
    <v-layout align-center justify-center column>
          <h1 class="display-2 font-weight-black teal--text">Locker Control</h1>
          <v-btn to="/login">LOGIN</v-btn>
          <v-btn to="/register">REGISTER</v-btn>
          <v-btn @click="realtime">GetData</v-btn>
          <h1 v-for="d in data" :key="d">{{d}}</h1>
    </v-layout>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      data: ''
    };
  },
  methods: {
    async getData () {
      let data = await firebase.firestore().collection('car').get()
      data.forEach((d) => {
        console.log(d.data())
      })
    },
    async realtime () {
      firebase.firestore().collection('car').doc('park').onSnapshot( function(doc) {
        this.data = doc.data()
        console.log(doc.data())
      })
    }
  },
};
</script>