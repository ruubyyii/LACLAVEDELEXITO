import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import PasswordsView from '@/views/PasswordsView.vue'
import {auth} from '@/db/firebase'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/passwords',
    name: 'passwords',
    component: PasswordsView,
    meta: { requiresAuth:true}
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  auth.onAuthStateChanged((user) => {
    if(to.meta.requiresAuth && !user){
      next({name: 'login'})
    }else if( user && (to.name == 'login' || to.name == 'register')){
      next({name: 'passwords'})
    }
    else{
      next()
    }
  })
})
export default router
