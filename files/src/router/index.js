import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import writePage from '@/components/writePage'



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
  }
]

export default new Router({
  routes
})
// .beforeEach(to, from, next) => {
//   if()
// }