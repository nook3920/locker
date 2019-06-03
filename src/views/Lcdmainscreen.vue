<template>
    <v-container fill-height fluid grid-list-xs id="bg">
        <v-layout wrap class="mt-1 py-0">
            <v-flex xs6 class="my-0">
                <img
                    width="70%"
                    height="70%"
                    src="https://firebasestorage.googleapis.com/v0/b/cpe-locker.appspot.com/o/cpe-locker.png?alt=media&token=c45c54a4-5764-40de-9927-6beb05947f51"
                >
            </v-flex>
            <v-flex xs6>
                <v-layout wrap class="py-0">
                    <v-flex v-for="locker in lockers" :key="locker.name" xs4 class="py-3">
                        <v-chip v-if="locker.lock" color="red" label>
                            <v-icon large left v-show="locker.isLock">lock</v-icon>
                            <v-icon large left v-show="!locker.isLock">lock_open</v-icon>
                            <span>{{locker.name}}</span>
                        </v-chip>
                        <v-chip v-else label color="green">
                            <v-icon large left v-show="locker.isLock">lock</v-icon>
                            <v-icon large left v-show="!locker.isLock">lock_open</v-icon>
                            <span>{{locker.name}}</span>
                        </v-chip>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs3 v-for="otp in otpList" :key="otp.id" class="py-0">
              <h1 >{{otp.id}}: {{otp.otp}}</h1>
            </v-flex>
            <v-flex xs6 class="py-0 offset-xs10">
              <v-btn depressed class=" grey darken-1 white--text" to="/Lcdlogin">Admin</v-btn>

            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import firebase, { firestore } from 'firebase'
var db = firebase.firestore()

export default {
    data() {
        return {
            lockers: [],
            sub: null,
            otpList: [],
            inter: null
        }
    },
    methods: {
        realtimeLocker() {
            this.sub = db.collection('Locker').onSnapshot(snap => {
                this.lockers = []
                snap.forEach(ss => {
                    this.lockers.push({ name: ss.id, lock: ss.data().use || false, isLock: ss.data().Lock || false })
                })
                this.otpList = []
                snap.forEach(ss => {
                    this.otpList.push({ ...ss.data(), id: ss.id })
                })
                this.otpList = this.otpList.filter(otp => {
                    return firestore.Timestamp.now().seconds - otp.exp.seconds < 50
                })
                console.log(this.otpList)
            })
        }
    },
    created() {
        this.realtimeLocker()
        this.inter = setInterval(() => {
            this.otpList = this.otpList.filter(otp => {
                return firestore.Timestamp.now().seconds - otp.exp.seconds < 50
            })
        }, 1000)
        // console.log(this.$route.path)
    },
    beforeDestroy() {
        this.sub()
        console.log('unsub dataaaa')
    }
}
</script>

