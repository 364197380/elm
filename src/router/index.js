import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/components/goods/v-goods'
import ratings from '@/components/ratings/v-ratings'
import setter from '@/components/setter/v-setter'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'goods',
      component: goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/setter/:sette',
      name: 'setter',
      component: setter
    }
  ]
})
