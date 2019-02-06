<template>
  <v-layout align-center justify-start row wrap>
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
          </v-avatar><h1>Register</h1>
        </v-chip>
      </v-sheet>

      <v-card-text class="pt-0 text-xs-center title font-weight-bold">
        <v-layout row wrap justify-center>
          <v-text-field label="Email" v-model="email"></v-text-field>
          <v-text-field label="Password" v-model="password" type="password"></v-text-field>
          <v-text-field label="name" v-model="fullName"></v-text-field>
          <v-text-field label="Student ID" v-model="studentId"></v-text-field>
          <v-text-field label="phone" v-model="phone"></v-text-field>
          <v-btn outline @click="signUp">Submit</v-btn>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      fullName: "",
      studentId: "",
      phone: ""
    };
  },
  methods: {
    show() {
      alert(this.email + this.password);
    },
    signUp() {
      this.$store.dispatch("userSignUp", {
        email: this.email,
        password: this.password,
        fullName: this.fullName,
        studentId: this.studentId,
        phone: this.phone
      });
    }
  }
};
</script>
