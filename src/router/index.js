import Vue from 'vue'
import VueRouter from 'vue-router'
import Pos from '../views/Pos.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Pos',
    component: Pos
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
