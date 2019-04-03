/* eslint-disable no-console */
<template>

    <v-layout class="mt-5" align-center justify-center column >
          <v-icon size="150" color="teal darken-2" >mail</v-icon>
        <v-layout class="mt-5">
          <v-btn color=" black white--text font-weight-bold " @click="sendVerify">send verify</v-btn>
          <v-btn color=" black white--text font-weight-bold " @click="getVerify">get verify</v-btn>

        </v-layout>
          
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
