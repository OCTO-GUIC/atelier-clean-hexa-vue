import { createRouter, createWebHistory } from 'vue-router'
import StoreView from '../views/StoreView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'store',
      component: StoreView,
    },
    {
      path: '/Battle',
      name: 'Battle',
      component: () => import('../views/BattleView.vue'),
    },
  ],
})

export default router
