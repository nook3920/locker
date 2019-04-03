<template>
    <v-layout  column> 
      <v-card color="grey lighten-3" mx-width="75%" class="mt-4 mx-auto" >
        <!-- <v-sheet elevation="8"> -->
       <p class="display-1 font-weight-black teal--text text-xs-center">เลือกช่องเก็บของ</p>
       <!-- </v-sheet> -->
       
       <v-layout wrap row d-flex mt-5>
        <v-flex mx-1 xs4 v-for="i in lockers" :key="i.name">
        <v-btn outline v-if="i.use || checkTime(i.isOnOtp)" disabled><v-icon>lock</v-icon></v-btn>
        <v-btn @click="verifyLocker(i.name)" round v-else>{{i.name}}</v-btn>
        </v-flex>
       </v-layout>
      </v-card>
        <v-progress-linear v-if="selectLock" :value="countdown" color="red" height="10">

        </v-progress-linear>
        <v-text-field v-if="selectLock" v-model="OTP" label="OTP"></v-text-field>
        <v-btn v-if="selectLock" @click="checkOTP">OK</v-btn>
    </v-layout>
  </template>

<script>

import firebase, { firestore } from 'firebase'
var db = firebase.firestore()
var auth = firebase.auth()
export default {
  data () {
    return {
      lockers: [],
      sub: null,
      verify: true,
      OTP: '',
      selectLock: '',
      countdown: 100,
      inter: null
    }
  },
  methods: {
    getRealtimeLocker(){
      this.sub = db.collection('Locker').onSnapshot(snap => {
        this.lockers = []
        snap.forEach(doc => {
          this.lockers.push({
            name: doc.id,
            use: doc.data().use || false,
            isOnOtp: doc.data().exp
          })
        })
        console.log(this.lockers)
      })
    },
    async selectLocker(name) {
      auth.onAuthStateChanged(async (uu) => {
        var batch = db.batch()
        var uid = uu.uid
        var tt = firestore.Timestamp.now()
        tt.seconds -= 100
        batch.update(db.collection('Locker').doc(name),{use: true, user: uid, exp: tt})
        batch.update(db.collection('Users').doc(uid), {locker: name})
        try {
          await batch.commit()  
          this.$router.push('MainScreen')
        } catch (err) {
          console.log(err) 
        }
      })
    },
    checkTime(tt) {
      return firestore.Timestamp.now().seconds - tt.seconds < 50
    },
    async verifyLocker(name){
      this.countdown = 100
      let otp = this.getRandomOtp()
      this.selectLock = name
      db.collection('Locker').doc(name).update({
        otp: otp,
        exp: firestore.Timestamp.now(),
      })
    },
    async checkOTP(){
      if(this.selectLock){
        let l = await db.collection('Locker').doc(this.selectLock).get()
        const lockerData = l.data()
        if(firestore.Timestamp.now().seconds - lockerData.exp.seconds > 50){
          console.log('otp expired')
          return
        }else {
          if(this.OTP === lockerData.otp){
            this.selectLocker(this.selectLock)
            console.log('otp correct')
          }else{
            console.log('wrong otp')
            return
          }
        }
      } else {
        console.log('please select locker')
      }
    },
    getRandomOtp(){
      let ran = ''
      do {
        ran = Math.floor(Math.random()*10000)+''
      } while (ran.length < 4);
      return ran
    }
  },
  watch:{
    countdown: function(){
      this.lockers = this.lockers.map(ss => ss)
      if(this.countdown < 0)
        this.selectLock = ''
    }
  },
  computed: {

  },
  created () {
    this.getRealtimeLocker()
    this.inter = setInterval(() => {
      this.countdown -= 2
    }, 1000)
  },
  beforeDestroy() {
    this.sub()
  }
}
</script>