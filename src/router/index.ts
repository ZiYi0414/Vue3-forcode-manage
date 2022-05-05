import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '主页',
    component: HomeView
  },
  {
    path: '/user',
    name: '用户管理',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/UserView.vue')
  },
  {
    path: '/board',
    name: '排行榜管理',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/BoardView.vue')
  },
  {
    path: '/share',
    name: '分享管理',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/ShareView.vue')
  },
  {
    path: '/Comment',
    name: '评论管理',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/CommentView.vue')
  },
  {
    path: '/about',
    name: '关于',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//export default router
