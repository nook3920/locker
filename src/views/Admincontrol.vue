<template>
  <v-container fluid >
    <v-layout align-center justify-center  column>
      <h1 class="display-2 font-weight-black teal--text">Locker Control</h1>
  
      <v-card class="mt-2" max-width="55%"  color="rgb(0, 0, 0, 0.1)">
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex xs4 v-for="locker in locker_list" :key="locker.name">
              <v-btn @click="openLocker(locker.name)" block large v-if="locker.lock">{{locker.name}}<v-icon right>lock</v-icon></v-btn>
              <v-btn @click="closeLocker(locker.name)" block large v-else>{{locker.name}}<v-icon right>lock_open</v-icon></v-btn>
              
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
        <v-layout justify-center >
            <v-btn @click="openAllLocker()" depressed class ="grey darken-1 white--text" >เปิดทุกช่อง</v-btn>
            <v-btn @click="closeAllLocker()" depressed class ="grey darken-1 white--text" >ปิดทุกช่อง</v-btn>
        </v-layout>    
        </v-card-actions>
      </v-card>
    <v-layout class="pt-3" justify-center >
        <v-btn @click="getLockerStatus()" depressed class ="grey darken-1 white--text" to="/lcdmainscreen" >กลับหน้าหลัก</v-btn>
        <v-btn depressed class ="grey darken-1 white--text" >เปลี่ยนรหัสผ่าน</v-btn>
    </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      locker_list: [
        {name: 'L1', lock: true,},
        {name: 'L2', lock: true,},
        {name: 'L3', lock: true,},
        {name: 'L4', lock: true,},
        {name: 'L5', lock: true,},
        {name: 'L6', lock: true,},
        {name: 'L7', lock: true,},
        {name: 'L8', lock: true,},
        {name: 'L9', lock: true,}
        
      ]
    }
  },
  methods: {
    openAllLocker(){
      var batch = firebase.firestore().batch()
      this.locker_list.forEach(locker => {
        let ref = firebase.firestore().collection('Locker').doc(locker.name)
        batch.set(ref, {Lock: false})
      })
      batch.commit()
      .then(() =>{
        this.locker_list = this.locker_list.map(locker => ({name: locker.name, lock: false}))
      })
      .catch(err => {
        console.log(err)
      })
    },
    closeAllLocker(){
      var batch = firebase.firestore().batch()
      this.locker_list.forEach(locker => {
        let ref = firebase.firestore().collection('Locker').doc(locker.name)
        batch.set(ref, {Lock: true})
      })
      batch.commit()
      .then(() =>{
        this.locker_list = this.locker_list.map(locker => ({name: locker.name, lock: true}))
      })
      .catch(err => {
        console.log(err)
      })
    },
    getLockerStatus() {
      let lockStatus = []
      firebase.firestore().collection('Locker').get()
      .then(docs => {
        docs.forEach(doc => {
          lockStatus.push({name: doc.id, lock: doc.data().Lock})
        })
      })
      .catch(err => {
        console.log(err)
      })
      this.locker_list = lockStatus
    },
    openLocker(lockerName) {
      firebase.firestore().collection('Locker').doc(lockerName).set({
        Lock: false
      })
      .then(() => {
        let i = this.locker_list.findIndex(ii => ii.name === lockerName)
        this.locker_list.splice(i, 1, {name: lockerName, lock: false})
      })
      .catch(err => {
        console.log(err)
      })
    },
    closeLocker(lockerName) {
      firebase.firestore().collection('Locker').doc(lockerName).set({
        Lock: true
      })
      .then(() => {
        let i = this.locker_list.findIndex(ii => ii.name === lockerName)
        this.locker_list.splice(i, 1, {name: lockerName, lock: true})
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.getLockerStatus()
  }
}
</script>
