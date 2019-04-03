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
              <h2 class="font-weight-bold white--text ">Account</h2>
          </v-chip>
        </v-sheet>

        <v-card-text class="pt-0 text-xs-center title font-weight-bold">
          <v-layout row wrap justify-center>
            <v-flex xs11 class="ma-1">
              <v-card color="black" v-if="!selectLock">
                <v-icon size="50" color="green accent-3" @click="$router.push('SelectLocker')">add_box</v-icon>
                <h4 class="font-weight-bold white--text " >เลือกช่อง</h4>
              </v-card>
              <v-card color="black" v-else>
                <v-icon size="50" color="red" @click="cancelLocker(selectLock)">indeterminate_check_box</v-icon>
                <h4 class="font-weight-bold white--text" >เลิกใช้ช่อง</h4>
              </v-card>
            </v-flex>
            <v-flex xs11 class="ma-1">
              <v-card color="black" v-if="lock" >
                <v-icon size="50" color="green accent-3" :disabled="!selectLock"  @click="toggleUnlock(selectLock)">lock</v-icon>
                <h4 class="font-weight-bold white--text " >ปลดล็อคช่อง</h4>
              </v-card>
              <v-card color="black" v-else >
                <v-icon size="50" color="red" :disabled="!selectLock" @click="toggleLock(selectLock)">lock_open</v-icon>
               <h4 class="font-weight-bold white--text " >ล็อคช่อง</h4>
              </v-card>
              
            </v-flex>
            
            <v-flex xs10 class="ma-3">
              
                <v-btn large color ="black" class = "font-weight-bold white--text " ><h3>ออกจากระบบ</h3>
                <v-icon right size="50" @click="logout" color="orange darken-1">exit_to_app</v-icon>
                <!-- <h4 class="font-weight-bold white--text " >ออกจากระบบ</h4> -->
                </v-btn>
              
            </v-flex>
          </v-layout>
        </v-card-text>
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
      selectLock: '',
      lock: true,
      uid: ''
    }
  },
  methods: {
    async getUser () {
      auth.onAuthStateChanged(async (uu) => {
      try {
        let user = await db.collection('Users').doc(uu.uid).get()
        this.selectLock = user.data().locker || ''
        console.log(this.selectLock)
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
      auth.signOut()
      this.$router.push('/')
    }
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