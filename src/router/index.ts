import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import navRouter from './navRouter'
import otherRouter from './otherRouter'

export const routes: Array<RouteRecordRaw> = [...navRouter, ...otherRouter]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLogin = sessionStorage.getItem('login')
  if (to.meta.requireAuth) {
    if (isLogin) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
})

//export default router
