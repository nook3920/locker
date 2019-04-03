import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/otp',
      name: 'otp',
      component: () => import('./views/Otp.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/mainscreen',
      name: 'MainScreen',
      component: () => import('./views/MainScreen.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('./views/Profile.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/selectlocker',
      name: 'SelectLocker',
      component: () => import('./views/SelectLocker.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/lcdmainscreen',
      name: 'Lcdmainscreen',
      component: () => import('./views/Lcdmainscreen.vue')
    },
    {
      path: '/lcdlogin',
      name: 'Lcdlogin',
      component: () => import('./views/Lcdlogin.vue')
    },
    {
      path: '/admincontrol',
      name: 'Admincontrol',
      component: () => import('./views/Admincontrol.vue')
    },
    {
      path: '/selectlock',
      name: 'Selectlock',
      component: () => import('./views/Selectlock.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/entercode',
      name: 'Entercode',
      component: () => import('./views/Entercode.vue')
    }
  ],
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  if(requiresAuth && !currentUser && to.path !== '/login') next('Login')
  
  else next()
})

export default router