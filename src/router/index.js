import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index'
import Register from '../views/Register'
import NotFound from '../views/404'
import Login from '../views/Login'
import Home from '../views/Home'
import User from '../views/User'
import MoneyView from '../views/MoneyView'
import MReport from '../views/MReport'
import YReport from '../views/YReport'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index,
      children: [
        { path: '', component:Home },
        { path: '/home', name:'home', component:Home },
        { path: '/user', name:'user', component:User },
        { path: '/moneyview', name: 'moneyview', component: MoneyView },
        { path: '/mreport', name: 'mreport', component: MReport },
        { path: '/yreport', name: 'yreport', component: YReport }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '*',
      name: '/404',
      component: NotFound
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.smToken ? true : false
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})

export default router