<template>
    <v-layout align-center justify-center column>
      <v-card class="mt-5 mx-auto" max-width="400">
      <v-sheet
        class="v-sheet--offset mx-auto"
        color="cyan"
        elevation="12"
        max-width="calc(100% - 32px)"
      >
        <v-chip label color="cyan">
          <v-avatar>
            <v-icon>account_circle</v-icon>
          </v-avatar><h1>Login</h1>
        </v-chip>
      </v-sheet>
      <v-card-text class="pt-0 text-xs-center title font-weight-bold">
        <v-layout row wrap justify-center>
          <v-text-field
            label="email"
            v-model="email"
          >
          </v-text-field>
          <v-text-field
            label="password"
            v-model="password"
          >
          </v-text-field>
          <v-btn @click="login">Login</v-btn>
        </v-layout>
      </v-card-text>
    </v-card>
          
    </v-layout>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>