import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios'
import axios from 'axios'

import App from './app.vue'
import Models from './models.vue'
// import Login from './component/login.vue'
import ChatRoom from './component/chat-room.vue'
// import Error from './component/error.vue'

import {
  getHexColor,
} from './lib'


Vue.use(VueRouter)
Vue.use(VueAxios, axios)

const appBaseURL = ''
Vue.prototype.$eventHub = new Vue()
Vue.prototype.$models = Models
Vue.prototype.$appBaseURL = appBaseURL
Vue.prototype.$getHexColor = getHexColor

const routes = [
  {
    name: 'chat-rom',
    path: '*',
    component: ChatRoom,
  },
]

const router = new VueRouter({ mode: 'history', routes: routes })

new Vue(Vue.util.extend({ router }, App)).$mount('#app')
