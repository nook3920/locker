import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import firebase from 'firebase'
import VeeValidate from 'vee-validate'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './registerServiceWorker'
import { firebaseConfig } from './config'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
let app = ''
library.add(faCoffee)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Vuetify)
Vue.use(VeeValidate)
firebase.initializeApp(firebaseConfig)
Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(() => {
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

