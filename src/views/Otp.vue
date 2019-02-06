/* eslint-disable no-console */
<template>
    <v-layout align-center justify-center column>
          <h1 class="display-2 font-weight-black teal--text">Locker Control</h1>
          <v-btn @click="sendVerify">Resend verify</v-btn>
          <v-btn @click="getVerify">get verify</v-btn>
          
    </v-layout>
</template>

<script>
export default {
  methods: {
    sendVerify () {
      // eslint-disable-next-line no-console
      console.log('send verify')
      this.$store.dispatch('sendVerify')
    },
    getVerify () {
      this.$store.dispatch('getVerify')
    }
  }
}
</script>
