import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
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
      component: () => import('./views/MainScreen.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/selectlocker',
      name: 'SelectLocker',
      component: () => import('./views/SelectLocker.vue')
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
    }

  ]
})