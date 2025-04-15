import { createRouter, createWebHistory } from 'vue-router'
import ShopPageView from '../views/ShopPageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: ShopPageView,
    },
    {
      path: '/Battle',
      name: 'Battle',
      component: () => import('../views/BattleView.vue'),
    },
  ],
})

export default router
