import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import writePage from '@/components/writePage'
import login from '@/components/login'
import userHome from '@/components/userHome'
import thesis from '@/components/thesis'
import editThesis from '@/components/editThesis'
import register from '@/components/register'


Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/writePage',
    name: 'writePage',
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
    component: writePage
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/userHome',
    name: 'userHome',
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
    component: userHome
  },
  {
    path: '/thesis/:thesisID',
    name: 'thesis',
    component: thesis
  },
  {
    path: '/editThesis/:thesisUUID',
    name: 'editThesis',
    component: editThesis
  },
  {
    path: '/register',
    name: 'register',
    component: register
  }
]



const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  let sessionUserInfo = window.sessionStorage.getItem('userInfo') || '{}';
  let userInfo =  JSON.parse(sessionUserInfo).data || '';
  if(to.meta.requireAuth && (userInfo.username === '' || userInfo.username === undefined)){
    console.log('require')
    next({path: '/login'})
  }else{
    next()
  }
})

export default router
