/* eslint-disable no-console */
<template>
    <v-layout align-center justify-center >
      <v-card
        color="grey lighten-2"
        elevation="6"
        class="mt-5 mx-auto "
        max-width="360"
        
      >
        <v-sheet
          class="v-sheet--offset mx-auto"
          color="black"
          elevation="5"
          max-width="calc(100% - 35px)"
        >
          <v-chip label color="black" @click="$router.push({name: 'Profile'})">
            <v-avatar>
              <v-icon color="white">account_circle</v-icon>
            </v-avatar >
              <h2 class="font-weight-bold white--text ">{{ userName }}</h2>
          </v-chip>
        </v-sheet>

        
          <v-layout row wrap justify-center>
            <v-flex xs9 class="ma-1">
              <v-btn round color="green accent-2 black--text" block v-if="!selectLock" large @click="$router.push('SelectLocker')">
                <h3>เลือกช่อง</h3>
                <v-icon right color="black" >add_box</v-icon>
              </v-btn>
              <v-btn round color="green accent-2 black--text" block v-else large @click="cancelLocker(selectLock)">
                <h3>เลิกใช้ช่อง</h3>
                <v-icon right color="black" >indeterminate_check_box</v-icon>
              </v-btn>
            </v-flex>

            <v-flex xs9 class="ma-1">
              <v-btn round color="green accent-2 black--text" block v-if="lock" :disabled="!selectLock" large @click="toggleUnlock(selectLock)">
                <h3>ปลดล็อคช่อง</h3>
                <v-icon right color="red" >lock</v-icon>
              </v-btn>
              <v-btn round color="green accent-2 black--text" block v-else :disabled="!selectLock" large @click="toggleLock(selectLock)">
                <h3>ล็อคช่อง</h3>
                <v-icon right color="red" >lock_open</v-icon>
              </v-btn>              
            </v-flex>
            <v-flex xs9 class="ma-1">
                <v-btn  round class="green  accent-2 black--text" @click="logout"  block large><h3>ออกจากระบบ</h3>
                <v-icon right color="red " >exit_to_app</v-icon>
                </v-btn> 
            </v-flex>
          </v-layout>
        
      </v-card>
    </v-layout>
</template>

<script>
import firebase from 'firebase'
var db = firebase.firestore()
var auth = firebase.auth()
//  neorutiontee@gmail.com
export default {
  data () {
    return {
      selectLock: '',
      lock: true,
      uid: '',
      userName: ''
    }
  },
  methods: {
    async getUser () {
      auth.onAuthStateChanged(async (uu) => {
      try {
        let user = await db.collection('Users').doc(uu.uid).get()
        this.userName = user.data().fullName
        this.selectLock = user.data().locker || ''
        // console.log(this.selectLock)
      } catch (err) {
        console.log(err)
      }
      })
    },
    cancelLocker(name) {
      var batch = db.batch()
      batch.update(db.collection('Locker').doc(name), {use: false, user: ''})
      batch.update(db.collection('Users').doc(auth.currentUser.uid), {locker: ''})

      try {
        batch.commit()
        console.log('cancel')
        this.getUser()
      } catch (err) {
        console.log(err)
      }
    },
    async toggleLock(name){
      try {
        
        await db.collection('Locker').doc(name).update({Lock: true})
        this.lock = true
        console.log('LOCK!!')
      } catch (error) {
        console.log(error)
      }
    },
    async toggleUnlock(name){
      try {
        await db.collection('Locker').doc(name).update({Lock: false})
        this.lock = false
        console.log('UNLOCK!!')
      } catch (error) {
        console.log(error)
      }
    },
    async logout(){
      console.log('logout')
      auth.signOut().then(() => {
        this.$router.push('/')
      })
    },
   
  },
  created() {
    this.getUser()
  },
  mounted() {
    // this.getUser()
    // console.log(this.selectLock)
  }
  
}
</script>

<style >
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>