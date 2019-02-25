<template>
    <v-layout align-center justify-center column>
          <br><h1 class="display-2 font-weight-black teal--text">Locker Control</h1><br>
         <br> <img width="50%" height="50%" src="https://firebasestorage.googleapis.com/v0/b/cpe-locker.appspot.com/o/protect.png?alt=media&token=f2af7574-ae41-4edc-9726-8353db150849"><br>

          <v-layout class="mt-4" row>
          <v-btn to="/login">LOGIN</v-btn>
          <v-btn to="/register">REGISTER</v-btn>
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