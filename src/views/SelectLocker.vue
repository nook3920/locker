<template>
    <v-layout  > 
      <v-card mx-width="75%" class="mt-4 mx-auto" >
        <!-- <v-sheet elevation="8"> -->
       <p class="display-1 font-weight-black teal--text text-xs-center">เลือกช่องเก็บของ</p>
       <!-- </v-sheet> -->
       <v-card-actions>
       <v-layout wrap row d-flex mt-5>
       <!-- <v-flex xs4 md4 xl4 sm4 lg4 v-for="locker in lockers" :key="locker.id" >
         <v-btn @click="locker.lock = !locker.lock" large outline v-if="locker.lock"><v-icon>lock</v-icon></v-btn>
         <v-btn @click="locker.lock = !locker.lock" large round v-else><v-icon>lock_open</v-icon></v-btn>
       
       </v-flex> -->
        <v-btn @click="unlockLocker" large outline v-if="lock"><v-icon>lock</v-icon></v-btn>
        <v-btn @click="lockLocker" large round v-else><v-icon>lock_open</v-icon></v-btn>
       </v-layout>
       </v-card-actions>
      </v-card>
    </v-layout>
  </template>

<script>

import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      lockers: [
        {id: 1, lock: true},
        {id: 2, lock: true},
        {id: 3, lock: true},
        {id: 4, lock: true},
        {id: 5, lock: true},
        {id: 6, lock: true},
        {id: 7, lock: true},
        {id: 8, lock: true},
        {id: 9, lock: true},
        {id: 10, lock: true},
        {id: 11, lock: true},
        {id: 12, lock: true}
      ]
    }
  },
  methods: {
    lockLocker () {
      this.$store.dispatch('lockLocker')
    },
    unlockLocker () {
      this.$store.dispatch('unlockLocker')
    }
  },
  computed: {
    ...mapGetters({
      lock: 'getLock'
    })
  },
  created () {
    this.$store.dispatch('getLockerState')
  }
}
</script>