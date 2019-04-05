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
        <v-btn @click="getLockerStatus()" depressed class="grey darken-1 white--text" to="/lcdmainscreen" >กลับหน้าหลัก</v-btn>
        <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn class="grey darken-1 white--text"  v-on="on">เปลี่ยนรหัสผ่าน</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Change Password</span>
        </v-card-title>
        <v-card-text>
           <v-container fluid>
    <v-layout align-center justify-center column>
      <v-layout class="py-2">
        <v-flex v-for="i in 6" :key="i">
          <v-icon v-if="pin[i-1]">ac_unit</v-icon>
          <v-icon v-else>minimize</v-icon>
        </v-flex>
      </v-layout>
      <v-card max-width="60%"  color="rgb(0, 0, 0, 0.1)">
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex xs4 md4 v-for="n in keypad" :key="n.name">
              <v-btn block   @click="key_action(n.val)" v-if="n.icon"><v-icon>{{n.icon}}</v-icon></v-btn>
              <v-btn block   @click="key_action(n.val)" v-else>{{n.name}}</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-layout>
  </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="changePassword">change</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        
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
        {name: 'L9', lock: true,},
      ],
      dialog: false,
      keypad: [
        {name: '1', val: 1},
        {name: '2', val: 2},
        {name: '3', val: 3},
        {name: '4', val: 4},
        {name: '5', val: 5},
        {name: '6', val: 6},
        {name: '7', val: 7},
        {name: '8', val: 8},
        {name: '9', val: 9},
        {name: 'del', val: 'del', icon: 'backspace'},
        {name: '0', val: 0},
        {name: 'enter', val: 'enter', icon: 'done'},
      ],
      pin: ''
    }
  },
  methods: {
    openAllLocker(){
      var batch = firebase.firestore().batch()
      this.locker_list.forEach(locker => {
        let ref = firebase.firestore().collection('Locker').doc(locker.name)
        batch.update(ref, {Lock: false})
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
        batch.update(ref, {Lock: true})
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
      firebase.firestore().collection('Locker').doc(lockerName).update({
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
      firebase.firestore().collection('Locker').doc(lockerName).update({
        Lock: true
      })
      .then(() => {
        let i = this.locker_list.findIndex(ii => ii.name === lockerName)
        this.locker_list.splice(i, 1, {name: lockerName, lock: true})
      })
      .catch(err => {
        console.log(err)
      })
    },
    key_action(val){
      console.log(val)
      if(val === 'del'){
        if(this.pin.length > 0){
          this.pin = this.pin.slice(0, -1)
        }
      }else if(val === 'enter'){
        this.changePassword()
      }else {
        if(this.pin.length < 6){
          this.pin += val
        }
      }
    },
    changePassword(){
      console.log(this.pin.length)
      if(this.pin.length === 6){
        firebase.firestore().collection('admin').doc('admin').update({
          password:this.pin
        }).then(() => {
          this.dialog = false
        }).catch(() => {
          alert('error cant change password')
        })
      } else {
        alert('password length = 6')
      }
    }
  },
  created () {
    this.getLockerStatus()
  }
}
</script>
