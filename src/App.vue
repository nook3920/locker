<template>
  <v-app >
    <v-toolbar app>
      <v-btn 
        icon v-if="$route.name !== 'home'"
        @click="$router.go(-1) "
      >
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title >
        <span>Locker Control by Nook</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click="$router.push({name: 'about'})"
        >
        <v-icon>bookmark</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content
    :style="{'background-image': 'url(' + require('./assets/background.jpg') + ')', 
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
            'background-position': 'center center' }"
    >
      <router-view></router-view>
    </v-content>
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
    }
  },
  computed: {
    ...mapGetters({
      loading: 'getLoading'
  })
    // loading () {
    //   return this.$store.getters.getLoading
    // }
  }
}
</script>

<style>
.loading-dialog{
  background-color: #282c2dad;
  
}
</style>
