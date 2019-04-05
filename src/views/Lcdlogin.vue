<template>
  <v-container fluid>
    <v-layout align-center justify-center  column>
      <h2 class="display-2 font-weight-black teal--text">Locker Control</h2>
      <v-alert :value="alert" outline transition="scale-transition" type="error"> WRONG PASSWORD</v-alert>
      <v-layout class="py-2">
        <v-flex v-for="i in 6" :key="i">
          <v-icon v-if="pin[i-1]">ac_unit</v-icon>
          <v-icon v-else>minimize</v-icon>
        </v-flex>
      </v-layout>
  
      <v-card max-width="45%"  color="rgb(0, 0, 0, 0.1)">
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
</template>
  

<script>
import firebase from 'firebase'
export default {
  
  data() {
    return {
      pin: '',
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
      alert: false
    }
  },
  methods: {
    key_action(val){
      if(val === 'del'){
        if(this.pin.length > 0){
          this.pin = this.pin.slice(0, -1)
        }
      }else if(val === 'enter'){
        this.adminLogin()
      }else {
        if(this.pin.length < 6){
          this.pin += val
        }
      }
    },
    adminLogin(){
      if(this.pin.length === 6){
        firebase.firestore().collection('admin').doc('admin').get()
        .then(data => {
          if(this.pin === data.data().password){
            this.$router.push({name: 'Admincontrol'})
            console.log('password correct')
          }else {
            console.log('wrong password')
            this.pin = ''
            this.alert = true
          }
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  },
  watch: {
    pin() {
      if(this.pin.length === 6){
        this.adminLogin()
      }
    }
  }

}
</script>
