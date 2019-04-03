<template>
    <v-container fill-height grid-list-xs fluid >
        <v-layout wrap row justify-center align-center>
            <v-flex  xs6>
            <img class="mt-3" width="70%" height="70%" src="https://firebasestorage.googleapis.com/v0/b/cpe-locker.appspot.com/o/cpe-locker.png?alt=media&token=c45c54a4-5764-40de-9927-6beb05947f51">
            </v-flex>
            <v-flex xs6>
               <v-layout wrap>
                   <v-flex v-for="locker in lockers" :key="locker.name" xs4>
                       <v-chip v-if="locker.lock" label>
                           <v-icon left>lock</v-icon>{{locker.name}}
                       </v-chip>
                       <v-chip v-else label>
                           <v-icon left>lock_open</v-icon>{{locker.name}}
                       </v-chip>
                    </v-flex>
               </v-layout>
            </v-flex>
        <v-btn depressed class ="mt-5 grey darken-1 white--text" to="/Lcdlogin">Admin</v-btn>
        </v-layout>
    </v-container>
</template>

<script>
import firebase from 'firebase'
var db = firebase.firestore()
export default {
    data () {
        return {
            lockers: [],
            sub: null
        }
    },
    methods:{
        realtimeLocker(){
            this. sub = db.collection('Locker').onSnapshot(snap => {
                this.lockers = []
                snap.forEach(ss => {
                    this.lockers.push({name: ss.id, lock: ss.data().use || false})
                })
            })
            
        }
    },
    created() {
        this.realtimeLocker()
        // console.log(this.$route.path)
    },
    beforeDestroy() {
        this.sub()
        console.log('unsub dataaaa')
    }
}
</script>
