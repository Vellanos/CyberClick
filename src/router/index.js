import { createRouter, createWebHistory } from 'vue-router'
import Home from "../components/Home.vue"
import Login from "../components/Login.vue"
import Register from "../components/Register.vue"
import Game from "../components/Game.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    }
  ]
})

export default router
