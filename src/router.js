import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Home from './views/Home.vue'
import Done from './views/Done.vue'
import Add from './views/Add.vue'
import Level from './views/Level.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/done',
      name: 'done',
      component: Done
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    },
    {
      path: '/level',
      name: 'level',
      component: Level
    }
  ]
})

router.afterEach((to, from) => {
  store.dispatch('hideInput')
})

export default router