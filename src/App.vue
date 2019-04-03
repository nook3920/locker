<template>
  <v-app>
    <v-toolbar app dark color="green accent-3" >
      <v-btn 
        
        v-if="iconshow"
        @click="$router.go(-1) "
        flat icon color="black"
      >
      <v-icon>reply</v-icon>
      </v-btn>
   
      <v-btn icon>
        <v-icon large color="black">account_balance_wallet</v-icon>
      </v-btn>
      <v-toolbar-title class="headline font-weight-bold black--text ">Locker Control</v-toolbar-title>
        <v-spacer></v-spacer>
      
    </v-toolbar>
    

    <v-content
    >
    <transition name="fade" mode="out-in">
      <v-container >

      <router-view></router-view>
      </v-container>
    </transition>

    </v-content>
    <v-footer dark height="auto">
    <v-card class="flex">
      <v-card-actions class="blue-grey lighten-2 black--text justify-center">
        <strong>&copy;2018 — CPE RMUTT</strong>
      </v-card-actions>
    </v-card>  
    </v-footer>
    <v-dialog v-model="loading" persistent fullscreen content-class="loading-dialog">
        <v-container fill-height>
          <v-layout row justify-center align-center>
            <v-progress-circular indeterminate :size="70" :width="7" color="purple"></v-progress-circular>
          </v-layout>
        </v-container>
      </v-dialog>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      iconshow: true
    }
  },
  computed: {
    ...mapGetters({
      loading: 'getLoading',
  })
    // loading () {
    //   return this.$store.getters.getLoading
    // }
  },
  watch: {
    $route: function(newval){
      if(newval.name === 'Lcdmainscreen' || newval.name === 'home')
        this.iconshow = false
      else
        this.iconshow = true
    }
  }
}
</script>

<style>
.loading-dialog{
  background-color: #282c2dad;
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
html{
      overflow-y: hidden;
}
</style>
