<template>
  <v-container fill-height>
    <v-layout align-center justify-center  column><br>
      
      <h2 class=" mt-1 gray light--text" >กรุณาเลือกช่อง</h2>
        
        <v-container class="my-3">
          <v-layout row wrap>
            <v-flex xs4 md6 lg6 xl6>
              <v-btn class="grey lighten-2 light black--text font-weight-bold" >l-1</v-btn>
            </v-flex>
            <v-flex xs4 md6 lg6 xl6>
              <v-btn class="grey lighten-2 light black--text font-weight-bold" >l-2</v-btn>
            </v-flex>
            <v-flex xs4 md6 lg6 xl6>
              <v-btn class="grey lighten-2 light black--text font-weight-bold" >l-3</v-btn>
            </v-flex>
            <v-flex xs4 md6 lg6 xl6>
              <v-btn class="grey lighten-2 light black--text font-weight-bold" >l-4</v-btn>
            </v-flex>
            <v-flex xs4 md6 lg6 xl6>
              <v-btn class="grey lighten-2 light black--text font-weight-bold" >l-5</v-btn>
            </v-flex>
            <v-flex xs4 md6 lg6 xl6>
             <v-btn class="grey lighten-2 light black--text font-weight-bold" >l-6</v-btn>
            </v-flex>
            <v-flex xs4 md6 lg6 xl6>
              <v-btn class="grey lighten-2 light black--text font-weight-bold" >l-7</v-btn>
            </v-flex>
            <v-flex xs4 md6 lg6 xl6>
              <v-btn class="grey lighten-2 light black--text font-weight-bold" >l-8</v-btn>
            </v-flex>
            <v-flex xs4 md6>
              <v-btn class="grey lighten-2 light black--text font-weight-bold" >l-9</v-btn>
            </v-flex>
           
          </v-layout>
        </v-container>
             
                <v-btn class="mt-5" feb dark normal  color ="black" @click="$router.push({name: 'MainScreen'})">
                  <v-icon outline >home</v-icon>
                </v-btn>
            
    </v-layout>
 </v-container>
</template>

