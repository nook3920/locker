<template>
  <v-layout align-center justify-start row wrap>
    <v-card color="grey lighten-3" class="mt-4 mx-auto" max-width="100%">
      <v-sheet
        class="v-sheet--offset mx-auto"
        color="black"
        elevation="10"
        max-width="calc(115% - 32px)"
      >
        <v-chip label color="black">
          <v-avatar>
            <v-icon color="white">account_circle</v-icon>
          </v-avatar >
          <h2 class="font-weight-bold white--text ">Register</h2>
        </v-chip>
      </v-sheet>

      <v-card-text class="pt-2 text-xs-center title font-weight-bold">
          <v-form>
            <v-container fluid>
            <v-layout column align-center justify-center >
              <v-text-field
                label="E-mail"
                prepend-icon="mail"
                v-model="email"
                v-validate="'required|email'"
                :error-messages="errors.collect('email')"
                data-vv-name="email"
                required
                ></v-text-field>

              <v-text-field
                v-model="password"
                prepend-icon="lock"
                label="Password"
                type="password"
                v-validate="'required|min:6'"
                :error-messages="errors.collect('password')"
                data-vv-name="password"
                required
                ></v-text-field>

              <v-text-field
                label="Name"
                prepend-icon="assignment_ind"
                v-model="fullName"
                v-validate="'required'"
                :error-messages="errors.collect('name')"
                data-vv-name="name"
                required
                ></v-text-field>
              <v-text-field
                label="Student ID"
                prepend-icon="vpn_key"
                v-model="studentId"
                v-validate="'required|digits:13'"
                :error-messages="errors.collect('studentId')"
                data-vv-name="studentId"
                required
                ></v-text-field>
              <v-text-field
                label="Phone"
                prepend-icon="phone"
                v-model="phone"
                v-validate="'required|digits:10'"
                :error-messages="errors.collect('phone')"
                data-vv-name="phone"
                required
                ></v-text-field>
              <v-btn class="green accent-3 light black--text font-weight-bold" @click="signUp">Submit</v-btn>
            </v-layout>
            </v-container>
          </v-form>
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
      phone: "",
      dic: {
        custom: {
          password: {
            min: 'password > 6 chars'
          },
          studentId: {
            digits: 'studentID = 13'
          },
          phone: {
            digits: 'phone = 10'
          }
        }
      }
    };
  },
  methods: {
    show() {
      alert(this.email + this.password);
    },
    signUp() {
      this.$validator.validateAll()
      .then(result => {
        this.$store.dispatch("userSignUp", {
          email: this.email,
          password: this.password,
          fullName: this.fullName,
          studentId: this.studentId,
          phone: this.phone
        })
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.$validator.localize('en', this.dic)
  }
};
</script>
