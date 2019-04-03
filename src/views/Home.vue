<template>
    <v-layout align-center justify-center column>
         
          <img class="mt-5"width="88%" height="88%" src="https://firebasestorage.googleapis.com/v0/b/cpe-locker.appspot.com/o/logo2.png?alt=media&token=5b0b23e4-d6e1-405c-9974-c0e0f8e7e7c7"><br>
          <v-layout class="mt-5" row>
          <v-btn color=" black white--text font-weight-bold "to="/login">LOGIN</v-btn>
          <v-btn color=" green accent-3 light black--text font-weight-bold " to="/register">REGISTER</v-btn>
          </v-layout>
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
    }
  }
};
</script>