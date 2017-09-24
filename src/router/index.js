import Vue from 'vue'
import Router from 'vue-router'
//import Hello from '@/components/Hello'
//import topSide from '@/components/topSide'
import side from '@/components/side'
const topSide = () => import('@/components/topSide')
//const side = () => import('@/components/side')
const Hello = () => import('@/components/Hello')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/restore',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: topSide
    },
    {
      path: '/location_on',
      name: 'location_on',
      component: side
    },
    {
      path: '/',
      name: 'main',
      component: side
    },
  ]
})
