<template>
  <v-layout align-center justify-center column>
    <v-card color="grey lighten-3" class="mt-5 mx-auto" max-width="90%">
      <v-sheet
        class="v-sheet--offset mx-auto "
        color="black"
        elevation="10"
        max-width="calc(120% - 32px)"
      >
        <v-chip label color="black">
          <v-avatar>
            <v-icon color="white">account_circle</v-icon>
          </v-avatar >
          <h2 class="font-weight-bold white--text ">Profile</h2>
        </v-chip>
      </v-sheet>
      <v-card-text class="pt-2 text-xs-left title font-weight-bold">
        <v-layout row wrap justify-center>
          <v-flex xs12 sm12 >

            <v-text-field :readonly="!editMode" label="ชื่อ-สกุล" v-model="name" append-icon="edit"></v-text-field>
            <v-text-field :readonly="!editMode" label="รหัสนักศึกษา" v-model="studentId" append-icon="edit"></v-text-field>
            <v-text-field :readonly="!editMode" label="เบอร์" v-model="phone" append-icon="edit"></v-text-field>
          </v-flex>
        </v-layout>
        <v-btn v-if="!editMode" green accent-3 @click="editMode = !editMode" color="green"><v-icon>edit</v-icon></v-btn>
        <v-btn v-else  @click="editUser"  color="green"><v-icon>save</v-icon></v-btn>
        <v-btn color=" grey darken-1  white--text font-weight-bold " @click="$router.push({name: 'MainScreen'})">Back</v-btn>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
import firebase from 'firebase'
var db = firebase.firestore()
var auth = firebase.auth()
export default {
  data () {
    return {
      name: '',
      studentId: '',
      phone: '',
      editMode: false
    }
  },
  methods: {
    async getUser() {
      try {
        var uid = ''
        auth.onAuthStateChanged( async (user) => {
          uid = user.uid
          let userr = await db.collection('Users').doc(uid).get()
          this.name = userr.data().fullName
          this.studentId = userr.data().studentId
          this.phone = userr.data().phone          
        })
      } catch (err) {
        console.log(err)
      }
    },
    async editUser() {
      this.editMode = !this.editMode
      auth.onAuthStateChanged( async (user) => {
        await db.collection('Users').doc(user.uid).update({
          fullName: this.name,
          studentId: this.studentId,
          phone: this.phone
        })
      })
      this.getUser()
    }
  },
  created() {
    // this.get User()
  },
  mounted() {
    this.getUser()
  }
};
</script>
