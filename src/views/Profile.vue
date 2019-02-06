<template>
  <v-layout align-center justify-center column>
    <v-card class="mt-5 mx-auto" max-width="75%">
      <v-sheet
        class="v-sheet--offset mx-auto"
        color="cyan"
        elevation="6"
        max-width="calc(100% - 32px)"
      >
        <v-chip label color="cyan">
          <h1>Profile</h1>
        </v-chip>
      </v-sheet>
      <v-card-text class="pt-2 text-xs-left title font-weight-bold">
        <v-layout row wrap justify-center>
          <v-text-field :readonly="!editMode" label="ชื่อ-สกุล" v-model="name" append-icon="edit"></v-text-field>
          <v-text-field :readonly="!editMode" label="รหัสนักศึกษา" v-model="studentId" append-icon="edit"></v-text-field>
          <v-text-field :readonly="!editMode" label="เบอร์" v-model="tel" append-icon="edit"></v-text-field>
        </v-layout>
        <v-btn v-if="!editMode" outline @click="editMode = !editMode" color="green"><v-icon>edit</v-icon></v-btn>
        <v-btn v-else outline @click="editMode = !editMode"  color="green"><v-icon>save</v-icon></v-btn>
        <v-btn>BACK</v-btn>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      name: 'tee',
      studentId: '1324',
      tel: '000011111',
      editMode: false
    }
  }
};
</script>
