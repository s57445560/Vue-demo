import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Home from '@/components/Home'
import Hostconf from '@/components/Hostconf'
import Apppath from '@/components/Apppath'
import Update from '@/components/update'
import History from '@/components/history'
import Login from '@/components/login'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home,
      children:[
        {path:"/",name:'main',component:Main},
        {path:"/hostconf",name:'hostconf',component:Hostconf},
        {path:"/apppath",name:'apppath',component:Apppath},
        {path:"/update",name:'update',component:Update},
        {path:"/history",name:'history',component:History},
      ]
    },
    {path: '/login', name: 'login', component: Login},

  ],
  mode:'history',
})
