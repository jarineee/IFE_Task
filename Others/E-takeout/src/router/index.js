import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/goods/goods'
import seeMore from '@/components/seeMore/seeMore'
import Ratings from '@/components/ratings/ratings'
import Seller from '@/components/seller/seller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'goods',
      component: Goods,
      alias: '/goods',
      children: [
        {
          path: 'food_detail',
          name: 'seeMore',
          component: seeMore
        }
      ]
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    }
  ],
  linkActiveClass: 'active'
})
