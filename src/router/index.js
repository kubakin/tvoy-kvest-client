import Vue from 'vue'
import VueRouter from 'vue-router'
import AutoQuest from '../views/AutoQuest.vue'
import Question from '../views/Question.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'auto',
    component: AutoQuest
  },
  {
    path:'/quest',
    name: 'quest',
    component: Question
  }
 
]

const router = new VueRouter({
  routes
})

export default router
