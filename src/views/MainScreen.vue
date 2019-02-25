/* eslint-disable no-console */
<template>
    <v-layout align-center justify-center >
      <v-card
        class="mt-5 mx-auto"
        max-width="400"
      >
        <v-sheet
          class="v-sheet--offset mx-auto"
          color="cyan"
          elevation="12"
          max-width="calc(100% - 32px)"
        >
          <v-chip label color="cyan" @click="$router.push({name: 'Profile'})">
            <v-avatar>
              <v-icon>account_circle</v-icon>
            </v-avatar>
            Account
          </v-chip>
        </v-sheet>

        <v-card-text class="pt-0 text-xs-center title font-weight-bold">
          <v-layout row wrap justify-center>
            <v-flex xs5 class="ma-1">
              <v-card  v-if="selectLock">
                <v-icon size="100" color="teal accent-3" @click="selectLock = !selectLock">add_box</v-icon>
                <p>เลือกช่อง</p>
              </v-card>
              <v-card v-else>
                <v-icon size="100" color="teal accent-3" @click="selectLock = !selectLock">indeterminate_check_box</v-icon>
                <p>เลิกใช้ช่อง</p>
              </v-card>
            </v-flex>
            <v-flex xs5 class="ma-1">
              <v-card v-if="lock">
                <v-icon size="100" color="teal accent-3" @click="lock = !lock">lock</v-icon>
                <p>ปลดล็อคตู้</p>
              </v-card>
              <v-card v-else>
                <v-icon size="100" color="teal accent-3" @click="lock = !lock">lock_open</v-icon>
                <p>ล็อคตู้</p>
              </v-card>
            </v-flex>
            <v-flex xs5 class="ma-1">
              <v-card>
                <v-icon size="100" color="teal accent-3">power_settings_new</v-icon>
                <p>ปิดโปรแกรม</p>
              </v-card>
            </v-flex>
            <v-flex xs5 class="ma-1">
              <v-card>
                <v-icon size="100" color="teal accent-3">exit_to_app</v-icon>
                <p>ออกจากระบบ</p>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-layout>
</template>

<script>
export default {
  data () {
    return {
      selectLock: true,
      lock: true
    }
  },
  methods: {
    test () {
      console.log('testttttt')
    }
  }
}
</script>

<style >
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>