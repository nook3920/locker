<template>
  <v-container fill-height >
    <v-layout align-center column>
      <v-card color="grey lighten-3" class="mt-4 mx-auto" max-width="300" elevation="15">
        <v-sheet
          class="v-sheet--offset mx-auto"
          color="black"
          elevation="10"
          max-width="calc(130% - 100px)"
        >
          <v-chip label color="black">
            <v-avatar>
              <v-icon color="white">account_circle</v-icon>
            </v-avatar>
            <h2 class="font-weight-bold white--text">Login</h2>
          </v-chip>
        </v-sheet>
        <v-card-text class="pt-3 text-xs-center title font-weight-bold">
          <v-layout row wrap justify-center class="mt-2">
            <v-text-field label="email" prepend-icon="person" v-model="email"></v-text-field>
            <v-text-field label="password" prepend-icon="lock" v-model="password" type="password"></v-text-field>
          </v-layout>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color=" green accent-3 light black--text font-weight-bold " @click="login">Submit</v-btn>
        </v-card-actions>
      </v-card>
      <v-layout class="mt-5">
      <v-layout class="mt-5">
        
      
      </v-layout>
      </v-layout>
    </v-layout>
      
      <v-snackbar v-model="snac" color="error" top :timeout="timeout">wrong email or password</v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      snac: false,
      timeout: 2000
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password
        })
        .then(res => {
          console.log("login su", res);
        })
        .catch(err => {
          this.snac = true;
          console.log("login err", err);
        });
    }
  }
};
</script>