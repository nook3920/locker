<template>
    <v-layout  > 
      <v-card color="grey lighten-3" mx-width="75%" class="mt-4 mx-auto" >
        <!-- <v-sheet elevation="8"> -->
       <p class="display-1 font-weight-black teal--text text-xs-center">เลือกช่องเก็บของ</p>
       <!-- </v-sheet> -->
       
       <v-layout wrap row d-flex mt-5>
        <v-flex mx-1 xs4 v-for="i in lockers" :key="i.name">
        <v-btn outline v-if="i.use" disabled><v-icon>lock</v-icon></v-btn>
        <v-btn @click="selectLocker(i.name)" round v-else>{{i.name}}</v-btn>
        </v-flex>
       </v-layout>
       
      </v-card>
    </v-layout>
  </template>

<script>

import firebase from 'firebase'
var db = firebase.firestore()
var auth = firebase.auth()
export default {
  data () {
    return {
      lockers: []
    }
  },
  methods: {
    async getLocker() {
      try {

        this.lockers = []
        let docs = await db.collection('Locker').get()
        docs.forEach(doc => {
            this.lockers.push({
              name: doc.id,
              use: doc.data().use || false
            })
        })
        console.log(auth.currentUser)
      } catch (err) {
        console.log(err)
      }
    },
    async selectLocker(name) {
      auth.onAuthStateChanged(async (uu) => {

        var batch = db.batch()
        var uid = uu.uid
        batch.update(db.collection('Locker').doc(name),{use: true, user: uid})
        batch.update(db.collection('Users').doc(uid), {locker: name})

        try {
          await batch.commit()  
          this.$router.push('MainScreen')
        } catch (err) {
          console.log(err)
      }
      })
    }
  },
  computed: {

  },
  created () {
    this.getLocker()
  }
}
</script>