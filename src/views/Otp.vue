/* eslint-disable no-console */
<template>

    <v-layout class="mt-5" align-center justify-center column >
          <v-icon size="150" color="teal darken-2" >mail</v-icon>
          <h1 class="text-xs-center">verify has been expired</h1>
        <v-layout class="mt-5">
          <v-btn color=" black white--text font-weight-bold " @click="sendVerify">Resend verify</v-btn>
          <!-- <v-btn color=" black white--text font-weight-bold " @click="getVerify">get verify</v-btn> -->

        </v-layout>
          
    </v-layout>
    
</template>

<script>
import firebase from 'firebase'


export default {
  created() {
    // console.log(this.$router.currentRoute.query)
    let actionType = this.$router.currentRoute.query.mode
    let actionCode = this.$router.currentRoute.query.oobCode

    if(actionType === 'verifyEmail'){
      firebase.auth().applyActionCode(actionCode).then(() => {
        this.$router.push('MainScreen')
      }).catch(err => {
        console.log(err)
      })
    }
    if(firebase.auth().currentUser.emailVerified){
      this.$router.push('MainScreen')
      console.log('verify true')
    }

    // firebase.auth().applyActionCode()
  },
  methods: {
    sendVerify () {
      // eslint-disable-next-line no-console
      console.log('send verify')
      this.$store.dispatch('sendVerify')
    },
    getVerify () {
      this.$store.dispatch('getVerify')
    },
  },
  mounted() {
    // console.log(this.$router.currentRoute.query)
  }
}
</script>
