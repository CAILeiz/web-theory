import Vue from 'vue'
import Router from 'vue-router'
const PageIndex = () => import('@/pages/PageIndex') // 首页
const PageProduction = () => import('@/pages/PageProduction') // 产品页
const PageContact = () => import('@/pages/PageContact') // 联系
const PageJoin = () => import('@/pages/PageJoin') // 加入
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PageIndex',
      component: PageIndex
    },
    {
      path: '/production',
      name: 'PageProduction',
      component: PageProduction
    },
    {
      path: '/contact',
      name: 'PageContact',
      component: PageContact
    },
    {
      path: '/join',
      name: 'PageJoin',
      component: PageJoin
    }
  ]
})
